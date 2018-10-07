const cheerio = require("cheerio");
const axios = require("axios");

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
  
      // Save these articles in an object that we'll push into the articles array we defined earlier
      articles.push({
        title: title,
        link: link,
        summary: summary
      });
    });
  
    res.render("index", {articles: articles});
  });
});

  
}

