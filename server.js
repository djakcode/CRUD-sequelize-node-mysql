console.log("Server is running...");

const express = require("express");
const ENV = require("./config");
const { db } = require("./models");
const cookieParser = require("cookie-parser");

const app = express();

// ? import routes
const userRoutes = require("./routes/User.router");
const articleRoutes = require("./routes/Article.router");
const noticesRoutes = require("./routes/Notice.router");

// ? PORT
const PORT = ENV.PORT || 8000;

// ? Middlewares
app.use(express.json()); // parse JSON data
app.use(cookieParser()); // parse cookies

// ? Prefix
app.use("/api/user", userRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/notice", noticesRoutes);

// ? Middleware for error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const details = err.details || null;

  res.status(status).json({
    status,
    message,
    details,
  });
});

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
