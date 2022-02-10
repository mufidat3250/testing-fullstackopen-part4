const blogRouter = require("express").Router();

const Blog = require("../models/blogListModel");

const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  // await Blog.deleteMany({});
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  const blog = request.body;

  const user = await User.findById(blog.userId);

  // console.log("userId:", user);

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

  const blogL = { ...body, likes: request.body.likes };

  let blogUpdate = await Blog.findByIdAndUpdate(request.params.id, blogL, {
    new: true,
  });
  response.json(blogUpdate);
});

module.exports = blogRouter;
