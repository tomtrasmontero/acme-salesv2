const express = require("express");
const app = express();
const swig = require("swig");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require('method-override'); 

swig.setDefault = ({cache: false});
app.set("view engine", "html");
app.engine("html", swig.renderFile);
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(methodOverride('_method')); 

app.get("/", function(req, res, next){
	res.render("index");
});

app.use('/regions', require('./routes/regions'));
app.use('/salesPeople', require('./routes/salesPeople'));
app.use('/salesPersonRegions', require('./routes/salesPersonRegions'));

app.use(function(err, req, res, next){
  console.log(err);
  //check what is in error? and send it back
  res.send(err);
});

module.exports = app;
