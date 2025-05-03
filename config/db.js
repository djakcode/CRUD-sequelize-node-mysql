const Sequelize = require("sequelize");
const ENV = require("./index.js");

console.log("MySQL initialization...");

const db = new Sequelize(ENV.DATABASE, ENV.USER, ENV.PASSWORD, {
  host: ENV.HOST,
  dialect: ENV.DIALECT,
  port: ENV.PORT_DB,
  logging: false,
});

// ! Connect to database
const connectDB = async () => {
  try {
    console.log("Trying to connect to database...");
    await db.authenticate();
    console.log("Connected to mysql database successfully!");
  } catch (error) {
    console.error("Error starting database", error.message);
  }
};

connectDB();

module.exports = db;
