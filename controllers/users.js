const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blogListModel");

usersRouter.get("/", async (request, response) => {
  // await User.deleteMany({});
  const users = await User.find({}).populate("blog", { title: 1, author: 1 });
  response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;

  // console({ body });

  const blog = await Blog.findById(body.blogId);

  if (body.password.length < 3) {
    response.status(400).json({ error: "longer password length" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    blog: blog._id,
  });

  const savedUser = await user.save();
  blog.user = blog.user.concat(savedUser._id);
  await user.save();

  response.json(savedUser);
});
module.exports = usersRouter;
