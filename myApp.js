let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');

console.log("Hello World");

app.use(bodyParser.urlencoded({ extended: false }), function (req, res, next) {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});

app.get("/", function (req, res) {
    //res.send("Hello Express");
    res.sendFile(__dirname + "/views/index.html"); //__dirname is module scoped variable; set to file's absolute directory path
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", function (req, res) {
    var response = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        response = response.toUpperCase();
    }
    res.json({ "message": response });
});

app.get('/now', function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.json({ "time": req.time });
});

app.get('/:word/echo', function (req, res) {
    res.json({ "echo": req.params.word });
});

app.route('/name')
    .get(function (req, res) {
        let userName = req.query.first + ' ' + req.query.last;
        res.json({ "name": userName });
    })
    .post(function (req, res) {
        let userName = req.body.first + ' ' + req.body.last;
        res.json({ "name": userName });
    });
























module.exports = app;
