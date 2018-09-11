var express = require("express");
var fs = require("fs");
var serveStatic = require("serve-static");
var app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use("*", function(req, res, next) {
  fs.readFile("./dist/index.html", function(err, result) {
    if (err) {
      return next(err);
    }

    res.set("content-type", "text/html");
    res.send(result);
    res.end();
  });
});

var port = process.env.PORT || 5000;
app.listen(port);
