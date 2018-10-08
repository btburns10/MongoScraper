const cheerio = require("cheerio");
const axios = require("axios");
const db = require("../models");

module.exports = function(app) {

app.get("/home", function(req, res) {
  res.redirect("/articles");
});

app.get("/scrape", function(req, res) {

  axios.get("http://www.espn.com/fantasy/football/").then(function(response) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);
  
    var articles = [];

    $(".item-info-wrap").each(function(i, element) {
  
      var title = $(element).find("h1").text();
      var link = $(element).find("h1").children().attr("href");
      var summary = $(element).find("p").text();
  
      // Save these articles in an object that we'll push into the articles array
      articles.push({
        title: title,
        link: link,
        summary: summary
      });

      //call the create method on our Article schema to add scraped article to mongo db
      db.Article.create(articles)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          return res.json(err);
        });
    });
    //send back response if scrape was successful
    res.send("scrape complete");
  });
});

app.get("/articles", function(req, res) {
  //grab all items from the 'articles' collection
  db.Article.find({})
    .then(function(dbArticle) {
      //render index handlebars with collected data
      res.render("index", {articles: dbArticle});
    })
    .catch(function(err) {
      return res.json(err);
    });
});

  
}

