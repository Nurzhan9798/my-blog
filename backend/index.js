const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Post = require("./models/Post");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "backend/uploads" });
const fs = require("fs");

const PORT = 4000;
const jwtSecret = "jfdaeda324fdsfasef";
const salt = bcrypt.genSaltSync(10);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/backend/uploads", express.static("backend/uploads"));

mongoose.connect(
  "mongodb+srv://root:xBfMOBnL006NkQ9c@cluster0.6orb3jn.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/", async (req, res) => {
  res.json("OK");
});

app.post("/registration", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ username, id: userDoc._id }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token)
          .json({ id: userDoc._id, username: username });
      });
    } else {
      res.status(400).json("wrong crediential");
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.post("/logut", async (req, res) => {
  res.cookie("token", "").json("ok");
});

app.get("/profile", (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.post("/post", upload.single("cover"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { title, summary, content } = req.body;
  const { token } = req.cookies;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, info) => {
      if (err) throw err;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });

      res.json(postDoc);
    });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.get("/posts", async (req, res) => {
  res.json(await Post.find().populate("author", ["username"]));
});

app.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const postDoc = await Post.findOne({ _id: postId }).populate("author", [
    "username",
  ]);
  res.json(postDoc);
});

app.listen(PORT, () => console.log("connected"));
//mongodb+srv://root:xBfMOBnL006NkQ9c@cluster0.6orb3jn.mongodb.net/?retryWrites=true&w=majority

//
