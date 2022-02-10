const Blog = require("./list_helper");

const defaultBlog = (blog) => {
  return !blog.hasOwnProperty("likes") ? { ...blog, likes: 0 } : blog;
};

const titleAndUrl = (blog) => {
  return !blog.hasOwnProperty("title") && !blog.hasOwnProperty("url")
    ? "400"
    : null;
};

module.exports = {
  defaultBlog,
  titleAndUrl,
};
