var express = require('express');
var app = express();

app.get('/hello', (req, res) => {
    res.send("Hello, world!");
});

app.post('/hello', (req, res) => {
    res.send("You just called the post method at '/hello'\n");
});

app.all('/test', (req, res) => {
    res.send("HTTP method doesnt have any effect on this route!");
});

app.listen(3000);