//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://ShaheenMohammed:Admin1234@cluster0-fpykt.mongodb.net/blogDB", { useUnifiedTopology: true, useNewUrlParser: true, });


const postSchema = {
    title: String,
    content: String
}

const Post = mongoose.model("Post", postSchema);



const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));





app.get("/", (req, res) => {

    Post.find({}, (err, items) => {
        if (err) {
            console.log(err);

        } else {
            res.render("home", { newPost: items });
        }
    });

});

app.get("/posts/:postid", (req, res) => {
    let params = _.capitalize(req.params.postid);

    Post.findOne({ title: params }, (err, item) => {

        if (err) {
            console.log(err);

        } else {
            res.render("post", { postTitle: item.title, postDescription: item.content });

        }
    });
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/about", (req, res) => {

    res.render("about");
});

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {
    const compose = {
        title: _.capitalize(req.body.title),
        content: req.body.post
    };
    Post.insertMany(compose, (err) => {
        if (err) {
            console.log(err);

        } else {
            console.log("success");

        }
    });
    res.redirect("/");
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("Server started");
});
