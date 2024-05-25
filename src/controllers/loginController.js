const bcrypt = require("bcryptjs");
const User = require("../models/user");
var jwtAuth = require("../middlewares/jwtAuth");


exports.login = async (req, res) => {
  let { email, password } = req.body;
  const user = await User.findOne({ email: email }).lean()

  if (!user) {
    res.status(404).send({message: "No  User Found"})
  } else {
    var validatePassword = await bcrypt.compare(password, user.password)

    if (!validatePassword) {
        res.status(400).send({message: "Invalid Password"})
    } else {
        var jwtToken = jwtAuth.authJWT(user);

        res.status(200).send({ token: jwtToken });
    }
  }
}