import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const blogPosts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { blogPosts: blogPosts });
});

app.get("/view/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find((post) => post.id === postId);

  if (post) {
    res.render("viewPost.ejs", { post });
  } else {
    res.status(404).send("Post não encontrado.");
  }
});

app.get("/addPost", (req, res) => {
  res.render("addPost.ejs");
});

app.post("/submit", upload.single("postImage"), (req, res) => {
  blogPosts.push({
    id: blogPosts.length + 1,
    postTitle: req.body.postTitle,
    postDesc: req.body.postDesc,
    postDate: new Date().toLocaleDateString("pt-BR"),
    postImage: "data:image/*;base64," + req.file.buffer.toString("base64"),
  });

  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find((p) => p.id === parseInt(postId));

  if (post) {
    res.render("editPost.ejs", { post });
  } else {
    res.status(404).send("Post não encontrado");
  }
});

app.post("/confirmEdit/:id", upload.single("postImage"), (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = blogPosts.findIndex((post) => post.id === postId);

  if (postIndex !== -1) {
    const updatedPost = {
      id: postId,
      postTitle: req.body.postTitle,
      postDesc: req.body.postDesc,
      postDate: new Date().toLocaleDateString("pt-BR"),
      postImage: req.file
        ? "data:image/*;base64," + req.file.buffer.toString("base64")
        : blogPosts[postIndex].postImage,
    };

    blogPosts[postIndex] = updatedPost;

    res.redirect("/");
  } else {
    res.status(404).send("Post não encontrado");
  }
});

app.post("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const index = blogPosts.findIndex((p) => p.id === parseInt(postId));

  if (index !== -1) {
    blogPosts.splice(index, 1);
    res.redirect("/");
  } else {
    res.status(404).send("Post não encontrado");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
