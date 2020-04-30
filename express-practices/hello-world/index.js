var express = require('express');
var app = express();

var things = require('./things.js');

app.get('/hello', (req, res) => {
    res.send("Hello, world!");
});

app.post('/hello', (req, res) => {
    res.send("You just called the post method at '/hello'\n");
});

app.all('/test', (req, res) => {
    res.send("HTTP method doesnt have any effect on this route!");
});

app.get('/:id', (req, res) => {
    res.send('The ID you specified is ' + req.params.id);
});

app.get('*', (req, res) => {
    res.send('Sorry, this is an invalid URL.');
});

// app.use('/things' || '/things/', (req, res, next) => {
//     console.log("A request for things received at " + Date.now());
//     next();
// });

app.use('/things' || '/things/', things);

app.listen(3000);