const bcrypt = require("bcryptjs");  // bcrypt modülünü içe aktarın
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
    const { email, currentPassword, newPassword, newEmail } = req.body;
    console.log("PATCH /user/update called");
    console.log("Request body:", req.body);

    try {
        const user = await User.findOne({ email: email });
        console.log("User found:", user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (currentPassword && newPassword) {
            console.log("Password update requested");

            // Mevcut şifreyi doğrula
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            console.log("Current password match:", isMatch);

            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            // Yeni şifreyi hashle
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            console.log("New hashed password:", hashedPassword);

            // Şifreyi güncelle
            const updateResult = await User.updateOne(
                { email: email },
                { password: hashedPassword }
            );
            console.log("Update result:", updateResult);

            console.log("Password updated successfully");
            return res.status(200).json({ message: 'Password updated successfully' });
        } else if (newEmail) {
            console.log("Email update requested");

            // E-posta adresini güncelle
            const updateResult = await User.updateOne(
                { email: email },
                { email: newEmail }
            );
            console.log("Update result:", updateResult);

            console.log("Email updated successfully");
            return res.status(200).json({ message: 'Email updated successfully' });
        } else {
            console.log("Invalid request: neither password nor email update");
            return res.status(400).json({ message: 'Invalid request' });
        }
    } catch (err) {
        console.error("Error in patchUser:", err);
        return res.status(500).json({ message: err.message });
    }
};
