let express = require('express');
let app = express();

console.log("Hello World");

app.get("/", function(req, res) {
    //res.send("Hello Express");
    res.sendFile(__dirname + "/views/index.html"); //__dirname is module scoped variable; set to file's absolute directory path
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", function(req, res) {
    res.json({"message": "Hello json"});
});






























 module.exports = app;
