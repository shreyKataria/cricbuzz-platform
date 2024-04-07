const User = require("../model/user");
async function generateUniqueUserId() {
  let userId;
  do {
    userId = Math.floor(Math.random() * 900000) + 100000; // Generate 6-digit number
  } while (await User.exists({ userId }));
  return userId;
}

module.exports = generateUniqueUserId;
