const User = require("../model/user");
// const { v4: uuidv4 } = require("uuid");
const ErrorResponse = require("../utils/errorResponse");
const generateUniqueUserId = require("../utils/userId");

const SignUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (existingUser) {
    return next(new ErrorResponse(" user already exist", 400));
  }

  if (!username || !email || !password) {
    return next(new ErrorResponse(" Require all fields", 401));
  }

  try {
    const uid = await generateUniqueUserId();

    const user = await User.create({
      // user_ID: uid,
      email,
      username,
      password,
      role: "admin",
    });
    // await user.save();
    // res.status(200).json({
    //   status: "Admin Account successfully created",
    //   user_ID: user._id,
    //   status_code: 200,
    //   user,
    // });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error.message);
  }
};

const LogIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return next(
        new ErrorResponse(
          "Incorrect username/password provided. Please retry",
          401
        )
      );
    }
    const isPasswordValid = await user.matchPasswords(password);
    if (!isPasswordValid) {
      return next(new Error("wrong password"));
    }
    sendToken(user, 200, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// sending token
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    status: "login successful",
    status_code: 200,
    user_id: user.id,
    access_token: token,
    user,
  });
};
module.exports = {
  SignUp,
  LogIn,
};
