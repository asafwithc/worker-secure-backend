const createError = require("http-errors");

exports.errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  console.error(`Error occurred:
    Status: ${status}
    Message: ${message}
    Stack: ${err.stack}`);
  res.status(status).json({ message: message });
};

exports.catch404 = (req, res, next) => {
  console.log(`404 Error: Requested URL not found - ${req.originalUrl}`);
  next(createError(404));
};
