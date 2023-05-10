const express = require('express');
const { create, verifyEmail, resendEmailVeriFicationToken, forgetPassword, sendResetPasswordTokenStatus, resetPassword, signIn } = require('../controllers/user');
const { userValidator, validate, validatePassword, signInValidator } = require('../middlewares/validator');
const { isValidPasswordResetToken } = require('../middlewares/user');
const { isAuth } = require('../middlewares/auth');
const router = express.Router();

router.post('/create', userValidator, validate, create);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification-token', resendEmailVeriFicationToken);
router.post('/forgot-password', forgetPassword);
router.post('/verify-pass-reset-token', isValidPasswordResetToken, sendResetPasswordTokenStatus);
router.post('/reset-password', validatePassword, validate, isValidPasswordResetToken, resetPassword);
router.post('/sign-in', signInValidator, validate, signIn);

router.get('/is-auth', isAuth, (req, res) => {
    const { user } = req;
    res.json({ user: { id: user._id, name: user.name, email: user.email } })
})


module.exports = router;