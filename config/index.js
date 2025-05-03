const dotenv = require("dotenv");

dotenv.config();

const ENV = {
  PORT: process.env.PORT || 8080,
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  PORT_DB: process.env.PORT_DB,
  DIALECT: process.env.DIALECT,
  TOKEN: process.env.TOKEN,
};

module.exports = ENV;
