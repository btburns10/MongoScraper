const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

const db = require("./models");

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/populatedb", { useNewUrlParser: true });

//run our server side route controllers with Express
require("./controllers/articles_controller.js")(app);


app.listen(PORT, function() {
  console.log("App running on PORT:" + PORT);
});


