// controllers/userController.js
const User = require("../models/user");

exports.postUser = async (req, res, next) => {
    console.log("Received signup request with data:", req.body);
    try {
        const user = await User.create(req.body);
        console.log("User created successfully:", user);
        res.status(200).json({ message: 'User created successfully', user });
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ message: err.message });
    }
};


exports.patchUser = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            await User.updateOne(user, req.body);
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
