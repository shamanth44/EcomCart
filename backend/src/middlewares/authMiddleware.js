const { User } = require("../models/userModel");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require('jsonwebtoken')

const verifyJwt = asyncHandler(async(req, _, next) => {
   try {
     const token = req.cookies?.token || req.header('Authorization')?.replace("Bearer ", "");
    
     if(!token) {
         throw new ApiError(401, "Unauthorised request");
     }
 
     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
 
     const user = await User.findById(decodedToken?._id).select("-password");
 
     if(!user) {
         throw new ApiError(401, "Invalid token")
     }

     req.user = user;
 
     next()
   } catch (error) {
    next(error);
   }
})

module.exports = verifyJwt;