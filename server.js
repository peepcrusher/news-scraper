var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });


app.get("/scrape", function (req, res) {
    axios.get("https://www.theonion.com/tag/opinion").then(function (response) {
        var $ = cheerio.load(response.data)


        $("div.item__text").each(function (i, element) {
            var result = {};

            result.title = $(this)
                .children("h1").text();

            result.summary = $(this)
                .children("div.entry-summary").children("p").text();

            result.link = $(this)
                .children("h1").children("a").attr("href");

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                    .catch(function (err) {
                        console.log(err);
                    })
        })
    })
})

app.listen(PORT, function () {
    console.log("App running on port " + PORT);
})