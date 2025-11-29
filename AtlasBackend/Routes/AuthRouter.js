const { signup, login } = require("../Controllers/AuthController");
const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");

const router = require("express").Router();

router.get("/login", (req, res) => {
    res.send("Login Page");
});

router.post("/login", loginValidation, login);

router.get("/signup", (req, res) => {
    res.send("Sign up Page");
});

router.post("/signup", signupValidation, signup);

module.exports = router;