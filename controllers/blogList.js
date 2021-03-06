const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const Blog = require("../models/blogListModel");
const User = require("../models/user");
const userExtractor = require("../utils/middleware").userExtractor;

blogRouter.get("/", async (request, response) => {
  // await Blog.deleteMany({});
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", userExtractor, async (request, response) => {
  const blog = request.body;
  const user = request.user;
  console.log({ userobj: request.user });

  //all the proccess is in the middle ware userExtractor

  let blogL = new Blog({
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url,
    user: user._id,
  });

  const savedBlog = await blogL.save();
  user.blog = user.blog.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
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
  console.log({ Blog });

  if (!request.token) {
    return response.status(401).json({ error: "Authentication required" });
  }
  const blog = await Blog.findById(request.params.id);

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: "Authentication failed" });
  }

  blog.remove();

  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blogL = { ...body, likes: request.body.likes };

  let blogUpdate = await Blog.findByIdAndUpdate(request.params.id, blogL, {
    new: true,
  });
  response.json(blogUpdate);
});

module.exports = blogRouter;
