const User = require("../models/user")

exports.create = async (req, res) => {

    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) res.status(401).json({ error: "Email already exist" });

    const newUser = new User({ name, email, password });
    await newUser.save()

    res.status(201).json({ user: newUser })
}