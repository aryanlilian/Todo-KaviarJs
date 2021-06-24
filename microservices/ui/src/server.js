/* eslint-disable */
const path = require("path");
const express = require("express");

var app = express();

app.use(express.static(path.join(process.cwd(), "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "dist", "index.html"));
});
app.set("port", process.env.PORT || 8080);

var server = app.listen(app.get("port"), function () {
  console.log("Listening on port: ", server.address().port);
});
