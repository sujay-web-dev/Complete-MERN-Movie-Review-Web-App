const { isValidObjectId } = require("mongoose");
const passResetToken = require("../models/passResetToken");

exports.isValidPasswordResetToken = async (req, res, next) => {
    const { token, userId } = req.body;

    if (!token || !isValidObjectId(userId)) return res.json({ error: "Invalid Request" });

    const resetToken = await passResetToken.findOne({ owner: userId });

    if (!resetToken) return res.json({ error: "The Token is Invalid" })

    const matched = await resetToken.compairToken(token);
    if (!matched) return res.josn({ error: "Invalid Token" });

    req.resetToken = resetToken;

    next();
}