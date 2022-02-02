const config = require("./utils/config");
const express = require("express");
const app = express();
const blogRouter = require("./controllers/blogList");
require("express-async-errors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const usersRouter = require("./controllers/users");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("conected to db");
  })
  .catch((error) => {
    logger.error("error connecting to db", error.message);
  });
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use(middleware.unKnownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
