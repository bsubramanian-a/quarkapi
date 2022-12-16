const express = require("express");
const router = express.Router();
const multer = require('multer');

const { createBooking, updateCompany } = require('../controllers/BookingController');
const { verifyToken } = require('../middleware/AuthJWT');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("dest", file);
        cb(null, "public/files");
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
    if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
    } else {
    cb(new Error("Not a PDF File!!"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fileSize: 10000000 // 1000000 Bytes = 1 MB
    },
});

// router.get('/', UserController.getAllUsers);
// router.post('/', UserController.addUser);
// router.get('/:id', UserController.getAUser);
// router.put('/:id', UserController.updatedUser);
// router.delete('/:id', UserController.deleteUser);

router.post('/create-booking',[verifyToken, upload.single("msds_file")],createBooking)
router.post('/update-booking',[verifyToken],updateCompany)
// router.post('/coach-login',coachLogin);
// router.post('/coach-otp',checkOTP);
// router.post('/coach-forget',coachForgetPassword);
// router.post('/coach-otp-forget',checkOTPForget);
// router.post('/coach-change-password',[verifyToken],coachChangePassword)
// router.put('/coach-update-profile/:id',[verifyToken],coachUpdateProfile);

module.exports = router;