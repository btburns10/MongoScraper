const db = require("../models");

module.exports = function(app) {

app.get("/articles/saved/:id", function(req, res) {
  
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

}