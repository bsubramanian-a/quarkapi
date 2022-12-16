const express = require("express");
const router = express.Router();
const { getAllUsers, loginUser, createUser, verifyUser} = require('../controllers/UserController');
const { checkCoachAlreadyExist } = require('../middleware/UserAuth');
const { verifyToken } = require('../middleware/AuthJWT');

router.get('/',getAllUsers);
router.post('/create-user',createUser);
router.post('/login-user',loginUser);
router.get('/login-user',loginUser);
router.get('/verify-user',verifyUser);

module.exports = router;