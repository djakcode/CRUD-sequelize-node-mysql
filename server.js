console.log("Server is running...");

const express = require("express");
const ENV = require("./config");
const { db } = require("./models");

const app = express();

// ? import routes

// ? PORT
const PORT = ENV.PORT || 8000;

// ? Middlewares

// ? Prefix

// ? Server
const startServer = async () => {
  try {
    // ! Connect to database
    await db.sync({ force: false });
    console.log("Connected to mysql database successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting database", error.message);
  }
};
startServer();
