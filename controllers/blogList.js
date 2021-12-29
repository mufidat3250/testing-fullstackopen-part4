const blogRouter = require("express").Router();
const { response } = require("express");
const Blog = require("../models/blogListModel");

blogRouter.get("/", (request, response) => {
  Blog.find().then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", (request, response, next) => {
  const blog = request.body;

  let blogL = new Blog({
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url,
  });

  blogL
    .save()
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
