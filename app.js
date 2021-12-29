const config = require("./utils/config");
const express = require("express");
const app = express();
const blogRouter = require("./controllers/blogList");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI);

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
app.use(middleware.unKnownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
