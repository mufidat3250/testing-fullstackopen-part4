const blogRouter = require("express").Router();
const { response } = require("express");
// const { response } = require("express");
const Blog = require("../models/blogListModel");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = request.body;

  let blogL = new Blog({
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url,
  });

  const savedBlog = await blogL.save();
  response.json(savedBlog);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;
  console.log(body);

  const blogL = { ...body, likes: request.body.likes };

  let blogUpdate = await Blog.findByIdAndUpdate(request.params.id, blogL, {
    new: true,
  });
  response.json(blogUpdate);
});

module.exports = blogRouter;
