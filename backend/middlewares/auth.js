const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/helper');
const User = require("../models/user");

exports.isAuth = async (req, res,next) => {

    const token = req.headers?.authorization;
    // console.log(token);
    const jwtToken = token.split('Bearer ')[1];
    console.log("jwtToken-->" + jwtToken);

    if (!jwtToken) return sendError(res, "Invalid Token!");
    const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const { userId } = decode;
    const user = await User.findById(userId);
    if (!user) return sendError(res, "Invalid Token User not Found", 404);

    req.user = user;
    next()
}