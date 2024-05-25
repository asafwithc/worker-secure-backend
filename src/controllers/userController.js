const User = require("../models/user");

exports.postUser = async (req, res, next) => {
    User.create(req.body)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json({ message: err.message }));
};
  
exports.patchUser = async (req, res, next) => {
    const { email } = req.body;
  
    User.findOne({email: email})
      .then((user) => User.updateOne(user, req.body))
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((err) => res.status(500).json({ message: err.message }));
}

