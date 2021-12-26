const http = require("http");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

if (process.argv.length < 3) {
  console.log(
    "please provide the password as an argument: node index.js <password>"
  );
  process.exit(1);
}

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

let bloglist = [
  {
    title: "mrs",
    author: "mufidat",
    url: "http://localhost3000/api/bloglist",
    likes: 4,
  },
  {
    title: "mr",
    author: "taye",
    url: "http://localhost3000/api/bloglist",
    likes: 4,
  },
];

const mongoUrl = `mongodb+srv://mufidat:iyanu3250@cluster0.quwf8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
`;

const Blog = mongoose.model("Blog", blogSchema);

mongoose.connect(mongoUrl);
.then((result) => {
  console.log("conected to db");
})
.catch((error) => {
  console.log("error connecting to db", error.message);
});

console.log("this is me", Blog);

app.post("/api/blogs", (req, res) => {
  let blog = req.body;
  // console.log(blog);

  let blogL = new Blog({
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url,
  });

  blogL.save().then((result) => {
    res.status(201).json(result);
  });
});

app.get("/api/blogs", (request, response) => {
  Blog.find().then((blogs) => {
    response.json(blogs);
  });
});

// app.delete("/api/blogs/:id", (req, res) => {
//   let id = Number(req.params.id);
//   let bloglist_ = bloglist.filter((blog, i) => {
//     return blog.id !== id;
//   });
//   response.status(200).end();
// });

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
