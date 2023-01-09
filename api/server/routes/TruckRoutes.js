const express = require("express");
const router = express.Router();
const { createTruck, updateCompany, getCompany } = require('../controllers/TruckController');
const { verifyToken } = require('../middleware/AuthJWT');

router.post('/create-truck',[verifyToken],createTruck)
router.post('/update-company',[verifyToken],updateCompany)
router.get('/get-company',[verifyToken],getCompany)
// router.post('/coach-login',coachLogin);
// router.post('/coach-otp',checkOTP);
// router.post('/coach-forget',coachForgetPassword);
// router.post('/coach-otp-forget',checkOTPForget);
// router.post('/coach-change-password',[verifyToken],coachChangePassword)
// router.put('/coach-update-profile/:id',[verifyToken],coachUpdateProfile);

module.exports = router;