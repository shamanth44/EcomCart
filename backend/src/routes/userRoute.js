const express = require("express");
const upload = require("../middlewares/multerMiddleware");
const { registerUser, loginUser, logoutUser, getUser, getBlogAuthor, getAllUsers, getUserData } = require("../controllers/userController");
const verifyJwt = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", upload.single("image"), registerUser);
router.post('/login', loginUser)
router.get('/get-user', verifyJwt,  getUser) //localhost:8000/api/user/get-user
router.post('/logout', verifyJwt, logoutUser)

module.exports = router;
