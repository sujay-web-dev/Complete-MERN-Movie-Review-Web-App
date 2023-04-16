exports.generateOTP = (otp_length = 5) => {
    // Generate 6 digit OTP
    let OTP = '';
    for (let i = 0; i <= otp_length; i++) {
        const randomVal = Math.round(Math.random() * 9);
        OTP += randomVal
    }
    return OTP
}

exports.generateMailTransporter = () => {
    return nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "be9cdae003621b",
            pass: "1f7a6b3178f3d2"
        }
    });
}