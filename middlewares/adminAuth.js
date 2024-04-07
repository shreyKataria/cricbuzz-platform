const jwt = require("jsonwebtoken");
const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");

const adminAuth = async (req, res, next) => {
  let token;

  // console.log(req.headers);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    // console.log(user);

    if (!user) {
      return next(new ErrorResponse("no user found with this id", 404));
    }

    req.user = user;
    // req.role = decoded.role;
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access", 401));
  }
};

module.exports = adminAuth;
