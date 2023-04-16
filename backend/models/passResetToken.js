const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const passResetToken = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
});

passResetToken.pre("save", async function (next) {
    if (this.isModified()) {
        this.token = await bcrypt.hash(this.token, 10);
    }

    next()
})

passResetToken.methods.compairToken = async function (token) {
    const result = await bcrypt.compare(token, this.token);

    return result
}

module.exports = mongoose.model("passResetToken", passResetToken);
