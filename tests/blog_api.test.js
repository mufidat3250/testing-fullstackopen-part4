const mongoose = require("mongoose");
const suppertest = require("supertest");
const app = require("../app");
const helper = require("../utils/list_helper").blogs;
console.log(helper.length);
const api = suppertest(app);
const Blog = require("../models/blogListModel");
const defaltlikes = require("../utils/blog_helper");
const titleUrl = require("../utils/blog_helper");
const toDeleteBlog = require("../utils/blog_helper");

const initialBlog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michae Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsge W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlog[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlog[1]);
  await blogObject.save();
});

test("blogs to be returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("check unique id", async () => {
  const res = await api.get("/api/blogs");
  expect(res.body[0].id).toBeDefined();
}, 100000);

test("adding new blog post ", async () => {
  const newblog = {
    _id: "5a422a851b54a676234d17f7",
    title: "musa",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    id: "5a422a851b54a676234d17f7",
  };

  await api
    .post("/api/blogs")
    .send(newblog)
    .expect(200)
    .expect("Content-type", /application\/json/);
  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlog.length + 1);
  expect(contents).toContain("Go To Statement Considered Harmful");
});

test("missing like propertice default to 0", async () => {
  const testLike = {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michae Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

  const likes = defaltlikes.defaultBlog(testLike);

  expect(likes).toHaveProperty("likes");
});

test("missing title and url", async () => {
  const newblog = {
    _id: "5a422a851b54a676234d17f7",
    author: "Michael Chan",
    likes: 7,
    id: "5a422a851b54a676234d17f7",
  };
  const noBlogTItleandUrl = titleUrl.titleAndUrl(newblog);
  await api.post("/api/blogs").send(noBlogTItleandUrl).expect(400);
}, 10000);

test("delete a post", async () => {});

afterAll(() => {
  mongoose.connection.close();
});
