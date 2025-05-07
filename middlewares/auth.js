const jwt = require("jsonwebtoken");
const ENV = require("../config");
const createError = require("./error");

const verifyToken = (req, res, next) => {
  // check if token is present in the request
  const token = req.cookies.access_token;

  // if token is not present, return error
  if (!token) return next(createError(401, "You are not authenticated!"));

  // verify token
  jwt.verify(token, ENV.TOKEN, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!")); // if token is invalid, return error (403 for forbidden)

    req.user = user; // set user in request object
    next(); // call next middleware
  });
};

module.exports = verifyToken;
