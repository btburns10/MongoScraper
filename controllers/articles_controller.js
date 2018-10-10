const cheerio = require("cheerio");
const axios = require("axios");
const db = require("../models");

module.exports = function(app) {

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

     
    });
    //render articles array with index handlebars
    res.render("index", {articles: articles});
  });
});

app.get("/articles/saved", function(req, res) {
  //pull all saved articles from the collections named 'articles'
  db.Article.find({})
    .then(function(dbArticles) {
      dbArticles.savedArticles = dbArticles;
      dbArticles.layout = "saved-layout";
      return res.render("saved", dbArticles);
    })
    .catch(function(err) {
      return res.json(err);
    });
});

app.post("/articles/saved", function(req, res) {
  //create new article schema for saved article requested from client side
  db.Article.create(req.body)
  .then(function(dbArticle) {
    console.log(dbArticle);
    return res.json({"saved article": dbArticle});
  })
  .catch(function(err) {
    return res.json(err);
  });

});


  
}

