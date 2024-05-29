const jwt = require("jsonwebtoken");

exports.authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).send({ message: "No token provided" });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).send({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).send({ message: "Failed to authenticate token" });
    }
};

exports.authJWT = (user) => {
  const payload = { user: { email: user.email } }; // email'i user nesnesine ekliyoruz
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  return token;
};

