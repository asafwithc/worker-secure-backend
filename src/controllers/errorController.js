/* var createError = require("http-errors");
 */
exports.catch404 = (req, res, next) => {
  next(createError(404));
};

exports.get404 = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message });
};