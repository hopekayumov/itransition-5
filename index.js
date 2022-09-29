const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Mail = require("./models/mail.model");

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://umidjon:umidjon1332@cluster0.krmqfn4.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(process.env.PORT || 1337, () => {
      console.log("Server is running");
    })
  )
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to our app ....");
});

app.post("/api/login", async (req, res) => {
  try {
    const allUsers = await User.find({}, "name");
    let doesExist = allUsers.find((item) => item.name === req.body.name);
    if (doesExist) {
      res.json({ status: "ok", userName: req.body.name });
      return;
    }
    const user = await User.create({
      name: req.body.name,
    });
    res.json({ status: "ok", userName: user.name });
  } catch (error) {
    res.json({ status: "error" });
  }
});

app.get("/api/login", async (req, res) => {
  try {
    const allUsers = await User.find({}, "name");
    res.json({ status: "ok", recipients: allUsers });
  } catch (error) {
    res.json({ status: "error" });
  }
});

app.post("/api/mail", async (req, res) => {
  try {
    await req.body.recipients.forEach((element) => {
      Mail.create({
        from: req.body.from,
        recipient: element,
        title: req.body.title,
        message: req.body.message,
      });
    });
    res.json({ status: "ok", msgs: "Mails sent" });
  } catch (err) {
    res.json({ status: "error", error: "Something went wrong" });
  }
});

app.get("/api/mail", async (req, res) => {
  try {
    let recipient = req.headers["x-access-token"];
    const messages = await Mail.find(
      { recipient },
      "from , title , message , messageCreationTime , isRead "
    );
    res.json({ status: "ok", messages: messages });
  } catch (err) {
    res.json({ status: "error", error: "Something went wrong" });
  }
});

app.put("/api/mail", async (req, res) => {
  try {
    const mail = await Mail.findOne({ _id: req.body.id });
    mail.updateOne({ isRead: true }, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Something went wrong" });
  }
});
