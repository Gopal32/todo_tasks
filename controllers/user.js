const userModel = require("../models/userModel/userModel.js");
const validate = require('../models/userModel/validation.js')
const passFunc = require('../lib/passwordHash.js')
const auth = require('../middleware/auth.js')

const signin = async (req, res) => {
  try {

    const checkValidation = await validate.signIn(req.body)

    const { email, password } = checkValidation;

    const oldUser = await userModel.findUser(email);

    if (oldUser.length === 0) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await passFunc.checkPassword(password, oldUser[0].hashPassword);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = auth.setToken({ email: oldUser[0].email })

    res.status(200).json({ userid: oldUser[0].userId, token });
  } catch (error) {
    res.status(error.errorMsg ? 400 : 500).json({ message: error.errorMsg ? error.errorMsg : "Something went wrong" });
  }
};

const signup = async (req, res) => {

  try {

    const checkValidation = await validate.signUp(req.body)

    const { email, password, name, address } = checkValidation;

    const oldUser = await userModel.findUser(email);

    if (oldUser.length > 0) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = passFunc.saltHashPassword(password);

    await userModel.createUser(email, hashedPassword.passwordHash, hashedPassword.salt, name, address);

    const token = auth.setToken({ email });

    res.status(201).json({ token });
  } catch (error) {
    res.status(error.errorMsg ? 400 : 500).json({ message: error.errorMsg ? error.errorMsg : "Something went wrong" });
  }
};

module.exports = { signup, signin }
