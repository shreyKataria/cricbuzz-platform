const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  console.log(err);

  if (err.code === 11000) {
    const message = `User Already exist`;
    error = new ErrorResponse(message, 400);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    status: error.message || "Server Error",
    status_code: error.statusCode,
  });
};

module.exports = errorHandler;
