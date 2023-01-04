const express = require("express");
const router = express.Router();
const { getAllUsers, loginUser, createUser, verifyUser, userAvatar, updateUser, changePassword, forgetPassword, resetPassword, verifyEmail, loginWithOTP, verifyLoginOTP, resendLoginOtp, loginTransporter, createTransporter } = require('../controllers/UserController');
const { checkCoachAlreadyExist } = require('../middleware/UserAuth');
const { verifyToken } = require('../middleware/AuthJWT');
const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("dest", file);
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        console.log("filename", file);
        const ext = file.mimetype.split("/")[1];
        cb(null, `file-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
    console.log("multerFilter", file);
    if (file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "png") {
        cb(null, true);
    } else {
        cb(new Error("Image format should be jpg, png or jpeg"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fileSize: 10000000 // 1000000 Bytes = 1 MB
    },
});

router.get('/',getAllUsers);
router.post('/create-user',createUser);
router.post('/forget-password',forgetPassword);
router.post('/reset-password',resetPassword);
router.post('/update-user',[verifyToken],updateUser);
router.post('/change-password',[verifyToken],changePassword);
router.post('/login-user',loginUser);
router.post('/verify-email',verifyEmail);
router.get('/login-user',loginUser);
router.post('/login-with-otp',loginWithOTP);
router.post('/login-transporter',loginTransporter);
router.post('/create-transporter',createTransporter);
router.post('/verify-login-otp',verifyLoginOTP);
router.post('/resend-login-otp',resendLoginOtp);
router.get('/verify-user/:email/:token',verifyUser);
router.post('/user-avatar',[verifyToken, upload.single("user_image")],userAvatar)

module.exports = router;