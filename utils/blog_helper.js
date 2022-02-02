const Blog = require("./list_helper");
console.log(Blog);

const defaultBlog = (blog) => {
  return !blog.hasOwnProperty("likes") ? { ...blog, likes: 0 } : blog;
};

const titleAndUrl = (blog) => {
  return !blog.hasOwnProperty("title") && !blog.hasOwnProperty("url")
    ? "400"
    : null;
};

const deleteBlog = (blogs) => {
  return blogs.filter((blog, id) => blog.id !== id);
};

module.exports = {
  defaultBlog,
  titleAndUrl,
  deleteBlog,
};
