const User = require("../models/user");
const emailVerificationSchema = require("../models/emailToken");
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

    sendError(res, "Please Verify your email . OTP has been Sent to Your Email Account!", 201)
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

    const user = await user.findOne({ email });
    if (!user) return sendError(res, "User Email Not Found", 404);

    const alreadyHasToken = await passResetToken.findOne({ owner: user._id })
    if (alreadyHasToken) return sendError(res, "Only after one hour you can Request for Another token!");

    const token = await generateRandomByte();

    const newForgetToken = await passResetToken({ owner: user._id, token });
    await newForgetToken.save();

    const resetPasswordURL = `https://localhost:3000/reset-password?token=${token}&id=${user._id}`;

    var transport = generateMailTransporter();

    transport.sendMail({ from: 'security@app.com', to: email, subject: "RESET Forgot Password", html: `<p>RESET Forgot Password</p>  <h1><a href="${resetPasswordURL}"></a></h1>` })

    sendError(res, "Please Verify your email . OTP has been RE - Sent to Your Email Account AGAIN !", 201);


}