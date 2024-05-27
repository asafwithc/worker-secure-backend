const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwtAuth = require("../middlewares/jwtAuth");
const Login = require("../models/login"); 

exports.login = async (req, res) => {
  console.log('Login request received:', req.body);
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).lean();
    if (!user) {
      console.log(`No user found with email: ${email}`);
      return res.status(404).send({ message: "No User Found" });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      console.log(`Invalid password for user with email: ${email}`);
      return res.status(400).send({ message: "Invalid Password" });
    }
    const jwtToken = jwtAuth.authJWT(user);
    console.log(`User logged in successfully: ${email}`);

    const loginData = new Login({ email, password, token: jwtToken });
    await loginData.save();

    return res.status(200).send({ token: jwtToken, name: user.name }); 
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
    return res.status(500).send({ message: error.message });
  }
};
