const { SignUp, LogIn } = require("../controllers/userController");

const router = require("express").Router();

router.post("/admin/signup", SignUp);
router.post("/admin/login", LogIn);

module.exports = router;
