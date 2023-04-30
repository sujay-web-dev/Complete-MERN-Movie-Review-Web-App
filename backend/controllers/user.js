const User = require("../models/user");
const emailVerificationSchema = require("../models/emailToken");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");
const { generateOTP, generateMailTransporter } = require("../utils/mail");
const { sendError, generateRandomByte } = require("../utils/helper");
const passResetToken = require("../models/passResetToken");

exports.create = async (req, res) => {

    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) return sendError(res, "This is already in use")

    const newUser = new User({ name, email, password });
    await newUser.save()

    // Generate 6 digit OTP
    let OTP = generateOTP()

    const newEmailtoken = new emailVerificationSchema({ owner: newUser._id, token: OTP });
    await newEmailtoken.save();

    // Send OTP to USER,
    var transport = generateMailTransporter();

    transport.sendMail({ from: 'verification@app.com', to: newUser.email, subject: "Email Verification", html: `<p>Your Verification OTP</p> <h1>${OTP}</h1>` })

    res.status(201).json({
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        }
    })
}

// verifyEmail
exports.verifyEmail = async (req, res) => {
    const { userId, OTP } = req.body;


    if (!isValidObjectId(userId)) return sendError(res, "Invalid User ID")

    const user = await User.findById(userId)
    if (!user) return res.json({ error: "User Not Found" });

    if (user.isVerified) return sendError(res, "User Already Verified")

    const token = await emailVerificationSchema.findOne({ owner: userId });

    if (!token) return sendError(res, "Token Not Found");

    const isMatched = await token.compairToken(OTP);

    if (!isMatched) return sendError(res, "Wrong OTP Provided");

    user.isVerified = true;
    await user.save();

    await emailVerificationSchema.findByIdAndDelete(token._id);

    var transport = generateMailTransporter();

    transport.sendMail({ from: 'verification@app.com', to: user.email, subject: "Email Verified", html: `<p>Email Verified OTP</p> <h1>Successfully</h1>` })

    sendError(res, "Your Email is verified", 201);

}

exports.resendEmailVeriFicationToken = async function (req, res) {
    const { userId } = req.body;

    const oldUserId = await User.findById(userId);

    if (!oldUserId) return sendError(res, "User not found");

    if (oldUserId.isVerified) return sendError(res, "User already Verified");

    const alreadyHasToken = await emailVerificationSchema.findOne({ owner: userId });
    if (alreadyHasToken) return sendError(res, "Token is not Yet Expired");

    // Generate 6 digit OTP
    let OTP = generateOTP();

    const newEmailtoken = new emailVerificationSchema({ owner: oldUserId._id, token: OTP });
    await newEmailtoken.save();

    // Send OTP to USER,
    var transport = generateMailTransporter();
    transport.sendMail({ from: 'verification@app.com', to: oldUserId.email, subject: "Email Verification", html: `<p>Your Verification OTP sent Again</p> <h1>${OTP}</h1>` })

    sendError(res, "Please Verify your email . OTP has been RE - Sent to Your Email Account AGAIN !", 201);

}

exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return sendError(res, "Email Missing");

    const user = await User.findOne({ email });
    if (!user) return sendError(res, "User Email Not Found", 404);

    const alreadyHasToken = await passResetToken.findOne({ owner: user._id })
    if (alreadyHasToken) return sendError(res, "Only after one hour you can Request for Another token!");

    const token = await generateRandomByte();

    const newForgetToken = await passResetToken({ owner: user._id, token });
    await newForgetToken.save();

    const resetPasswordURL = `https://localhost:3000/reset-password?token=${token}&id=${user._id}`;

    var transport = generateMailTransporter();

    transport.sendMail({ from: 'security@app.com', to: email, subject: "RESET Forgot Password", html: `<p>RESET Forgot Password</p>  <a href="${resetPasswordURL}">Reset Password</a>` })

    sendError(res, "RESET Forgot Password sent to Your MAIL Please Check. !", 201);
}

exports.sendResetPasswordTokenStatus = (req, res) => {
    res.json({ valid: true });
}

exports.resetPassword = async (req, res) => {
    const { newPassword, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.json({ error: "Invalid User Id" });

    const matched = await user.comparePassword(newPassword);

    if (matched) return sendError(res, "Please Enter new Password");

    user.password = newPassword;
    await user.save();

    var transport = generateMailTransporter();

    transport.sendMail({ from: 'security@app.com', to: user.email, subject: "Password RESET Successfully", html: `<p>Password RESET Successfully</p>` })

    await passResetToken.findByIdAndDelete(req.resetToken._id)

    res.json({ message: "Password Changed Successfully." })

}

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return sendError(res, "Wrong UN or Password");

    const matched = await user.comparePassword(password);
    if (!matched) return sendError(res, "Invalid Request Or Wrong Password");

    const { _id, name } = user;

    const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);

    res.json({ user: { id: _id, name, email, token: jwtToken } });

}