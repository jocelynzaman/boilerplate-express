let express = require('express');
let app = express();
require('dotenv').config();

console.log("Hello World");

app.use(function(req, res, next) {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});

app.get("/", function(req, res) {
    //res.send("Hello Express");
    res.sendFile(__dirname + "/views/index.html"); //__dirname is module scoped variable; set to file's absolute directory path
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", function(req, res) {
    var response = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase")
    {
        response = response.toUpperCase();
    }
    res.json({"message": response});
});

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({"time": req.time});
});

app.get('/:word/echo', function(req, res) {
    res.json({"echo": req.params.word});
});




























 module.exports = app;
