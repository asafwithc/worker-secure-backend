const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwtAuth = require("../middlewares/jwtAuth");
const Login = require("../models/login");

exports.login = async (req, res) => {
    let { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email }).lean();
        if (!user) {
            return res.status(404).send({ message: "No User Found" });
        }
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(400).send({ message: "Invalid Password" });
        }
        const jwtToken = jwtAuth.authJWT(user);

        // Save login information to the login collection
        const loginData = new Login({ email, token: jwtToken });

        console.log(`Login data before save: ${loginData}`);

        await loginData.save();

        console.log(`Login data saved: ${loginData}`);

        return res.status(200).send({ token: jwtToken, name: user.name }); 
    } catch (error) {
        console.error(`Error saving login data: ${error.message}`);
        return res.status(500).send({ message: error.message });
    }
};
