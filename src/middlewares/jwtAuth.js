const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authJWT = (user) => {
    console.log(process.env.ACCESS_TOKEN_SECRET)
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN});
  return accessToken;
};

exports.authenticate = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) return res.status(500).json({ message: "User not found." });
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
      res.json({ Token: accessToken });
    })
    .catch((err) => next(err));
};

exports.authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(500).json({ message: "No JWT token found." });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(500).json({ message: err });
    req.userId = user.user._id;
    next();
  });
};