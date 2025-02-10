const { User } = require("../models/userModel");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const uploadOnCloudinary = require("../utils/cloudinary");


//Generate token
const tokenGenerate = async (userId) => {
    try {
        const user = await User.findById(userId);
        const token = user.generateToken();
        
        return token;
    } catch (error) {
        throw new ApiError(500, "Something went wrong")
    }
}

//Register user
const registerUser = asyncHandler(async ( req, res, next )=> {

    try {
        const { name, email, password } = req.body
    
        // if([name, email, password].some((field) => field.trim() === "")) {
        //     throw new ApiError(400, "All fields are required");
        // }
        if(!name) {
            throw new ApiError(400, "Name is required")
        }
        if(!email) {
            throw new ApiError(400, "Email is required")
        }
        if(!password) {
            throw new ApiError(400, "Password is required")
        }
    
        let imageLocalPath;
    
        if(req.file !== undefined) {
            imageLocalPath = req.file.path
        }
    
        const image = await uploadOnCloudinary(imageLocalPath) 
        const existedUser = await User.findOne({email});
    
        if(existedUser) {
            throw new ApiError(401, "User already existed")
        }
    
        const user = await User.create({ 
            name,
            email,
            password,
            image: image?.secure_url || undefined
        })

        const createdUser = await User.findOne(user._id).select("-password")
    
        res.json({
            createdUser
        })
    } catch (error) {
        next(error);
    }

})

//Get user
const getUser = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password')
    
        if (!user) {
            throw new ApiError(401, "Failed to fetch user details");
        }
    
        return res.json({
            authenticated: true,
            user
        });
    } catch (error) {
        next(error);
    }
});

//Login User
const loginUser = asyncHandler(async (req, res, next)=> {
    try {
        const { email, password } = req.body;

    
        if(!email) {
            throw new ApiError(400, "Email is required")
        }
    
        const user = await User.findOne({email})
    
        if(!user) {
            throw new ApiError(401, "User doesn't exist")
        }
    
        const isPasswordValid = await user.isPasswordCorrect(password);
    
        if(!isPasswordValid) {
            throw new ApiError(401, "Wrong password")
        }

        const token = await tokenGenerate(user._id)
    
        const loggedInUser = await User.findById(user._id).select('-password')
    
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 8640000 * 28,
        }
    
        return res.cookie('token', token, options).json({
            loggedInUser,
            token
        })
        
    } catch (error) {
        next(error);
    }
})

//Logout user
const logoutUser = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }

    return res.clearCookie('token', options).json({
        authenticated: false,
        message: "Logged out"
    })
})


module.exports = { registerUser, loginUser, getUser, logoutUser }
