const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const ENV = require("../config");
const createError = require("../middlewares/error");

exports.signup = async (req, res, next) => {
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // create user
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(createError(500, "Internal Server Error", error.message));
  }
};

exports.signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return next(createError(404, "User not found", error.message));
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return next(createError(401, "Invalid password"));
    }

    // generate token
    const token = jwt.sign({ id: user.id }, ENV.TOKEN, { expiresIn: "24h" });

    // send response without password
    const { password, ...userData } = user.dataValues;

    // create cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false, // set to true in production
      sameSite: "Strict", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    res.status(200).json({ message: "logged in sucessfully", userData });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ message: "users found", users });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};
