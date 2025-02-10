const { Product } = require("../models/productModel");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const uploadOnCloudinary = require("../utils/cloudinary");


const createProduct = asyncHandler(async ( req, res, next )=> {

    try {
        const { name, price, description } = req.body

        if(!name) {
            throw new ApiError(400, "Name is required")
        }
        if(!price) {
            throw new ApiError(400, "price is required")
        }
        if(!description) {
            throw new ApiError(400, "description is required")
        }
    
        let imageLocalPath;
    
        if(req.file !== undefined) {
            imageLocalPath = req.file.path
        }
    
        const image = await uploadOnCloudinary(imageLocalPath) 
       
    
        const product = await Product.create({ 
            name,
            price,
            description,
            image: image?.secure_url || undefined
        })
    
        res.json({
            product
        })
    } catch (error) {
        next(error);
    }

})


const getProducts = asyncHandler(async(req, res, next)=> {
    const products = await Product.find()

    if(!products) {
        throw new ApiError(400, "Products not found")
    }

    res.json({
        products
    })
})

module.exports = { createProduct, getProducts }
