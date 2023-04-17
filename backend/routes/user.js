const express = require('express');
const { create, verifyEmail, resendEmailVeriFicationToken, forgetPassword, sendResetPasswordTokenStatus, resetPassword } = require('../controllers/user');
const { userValidator, validate, validatePassword } = require('../middlewares/validator');
const { isValidPasswordResetToken } = require('../middlewares/user');

const router = express.Router();

router.post('/create', userValidator, validate, create);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification-token', resendEmailVeriFicationToken);
router.post('/forgot-password', forgetPassword);
router.post('/verify-pass-reset-token', isValidPasswordResetToken, sendResetPasswordTokenStatus);
router.post('/reset-password', validatePassword, validate, isValidPasswordResetToken, resetPassword);

module.exports = router