const express = require('express');
const { create, verifyEmail, resendEmailVeriFicationToken, forgetPassword } = require('../controllers/user');
const { userValidator, validate } = require('../middlewares/validator');

const router = express.Router();

router.post('/create', userValidator, validate, create);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification-token', resendEmailVeriFicationToken);
router.post('/forgot-password', forgetPassword);

module.exports = router