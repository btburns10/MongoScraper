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

app.post("/articles/saved/:id", function(req, res) {

  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true});
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.delete("/articles/saved/:id", function(req, res) {

  db.Article.deleteOne({ _id: req.params.id })
    .then(function(deletedArticle) {
      db.Note.deleteOne({ _id: deletedArticle.note })
        .then(function(deletedNote) {
          res.json({"successfully deleted docs": {deletedArticle, deletedNote}});
        })
        .catch(function(err) {
          res.json(err);
        });
    })
    .catch(function(err) {
      res.json(err);
    });
});

}