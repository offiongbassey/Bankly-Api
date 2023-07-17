const express = require("express");
const { createUser, loginUser, logoutUser, loggedInStatus, resendVerificationMail, verifyUser, resetPassword, changePassword, userInfo } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/createuser', createUser);
router.post('/signin', loginUser);
router.get('/logout', logoutUser);
router.get('/loggedinstatus', loggedInStatus);
router.get('/resendverification', resendVerificationMail);
router.patch('/verifyuser/:token', verifyUser);
router.post('/resetpassword',   resetPassword);
router.patch('/changepassword/:token', changePassword);
router.get("/userinfo", authMiddleware, userInfo);

module.exports = router;