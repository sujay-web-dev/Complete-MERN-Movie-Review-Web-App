const User = require("../models/user");
const emailVerificationSchema = require("../models/emailToken");
const nodemailer = require('nodemailer');
const { isValidObjectId } = require("mongoose");
const { generateOTP, generateMailTransporter } = require("../utils/mail");

exports.create = async (req, res) => {

    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) res.status(401).json({ error: "Email already exist" });

    const newUser = new User({ name, email, password });
    await newUser.save()

    // Generate 6 digit OTP
    let OTP = generateOTP()

    const newEmailtoken = new emailVerificationSchema({ owner: newUser._id, token: OTP });
    await newEmailtoken.save();

    // Send OTP to USER,
    var transport = generateMailTransporter();

    transport.sendMail({ from: 'verification@app.com', to: newUser.email, subject: "Email Verification", html: `<p>Your Verification OTP</p> <h1>${OTP}</h1>` })

    res.status(201).json({ message: "Please Verify your email . OTP has been Sent to Your Email Account!" })
}

// verifyEmail
exports.verifyEmail = async (req, res) => {
    const { userId, OTP } = req.body;

    if (!isValidObjectId(userId)) return res.json({ error: "Invalid User ID" });

    const user = await User.findById(userId)
    if (!user) return res.json({ error: "User Not Found" });

    if (user.isVerified) return res.json({ error: "User Already Verified" });

    const token = await emailVerificationSchema.findOne({ owner: userId });

    if (!token) return res.json({ error: "Token Not Found" });

    const isMatched = await token.compairToken(OTP);

    if (!isMatched) return res.json({ error: "Wrong OTP Provided" })

    user.isVerified = true;
    await user.save();

    await emailVerificationSchema.findByIdAndDelete(token._id);

    var transport = generateMailTransporter();

    transport.sendMail({ from: 'verification@app.com', to: user.email, subject: "Email Verified", html: `<p>Email Verified OTP</p> <h1>Successfully</h1>` })

    res.json({ message: "Your Email is verified" })

}

exports.resendEmailVeriFicationToken = async function (req, res) {
    const { userId } = req.body;

    const oldUserId = await User.findById(userId);

    if (!oldUserId) return res.json({ error: "User not found" });

    if (oldUserId.isVerified) return res.json({ error: "User already Verified" });

    const alreadyHasToken = await emailVerificationSchema.findOne({ owner: userId });

    if (alreadyHasToken) return res.json({ error: "Token is not Yet Expired" });

    // Generate 6 digit OTP
    let OTP = generateOTP();

    const newEmailtoken = new emailVerificationSchema({ owner: oldUserId._id, token: OTP });
    await newEmailtoken.save();

    // Send OTP to USER,
    var transport = generateMailTransporter();

    transport.sendMail({ from: 'verification@app.com', to: oldUserId.email, subject: "Email Verification", html: `<p>Your Verification OTP sent Again</p> <h1>${OTP}</h1>` })

    res.status(201).json({ message: "Please Verify your email . OTP has been RE - Sent to Your Email Account AGAIN !" })

}