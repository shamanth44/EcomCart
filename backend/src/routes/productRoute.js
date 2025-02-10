const express = require("express");
const upload = require("../middlewares/multerMiddleware");
const { createProduct, getProducts } = require("../controllers/productController");

const router = express.Router();

router.post("/create-product", upload.single("image"), createProduct);
router.get("/get-products", getProducts);


module.exports = router;
