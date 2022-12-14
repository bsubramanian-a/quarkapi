const express = require("express");
const router = express.Router();
const { createCompany, updateCompany, getCompany } = require('../controllers/CompanyController');
const { verifyToken } = require('../middleware/AuthJWT');


// router.get('/', UserController.getAllUsers);
// router.post('/', UserController.addUser);
// router.get('/:id', UserController.getAUser);
// router.put('/:id', UserController.updatedUser);
// router.delete('/:id', UserController.deleteUser);

router.post('/create-company',[verifyToken],createCompany)
router.post('/update-company',[verifyToken],updateCompany)
router.get('/get-company',[verifyToken],getCompany)
// router.post('/coach-login',coachLogin);
// router.post('/coach-otp',checkOTP);
// router.post('/coach-forget',coachForgetPassword);
// router.post('/coach-otp-forget',checkOTPForget);
// router.post('/coach-change-password',[verifyToken],coachChangePassword)
// router.put('/coach-update-profile/:id',[verifyToken],coachUpdateProfile);

module.exports = router;