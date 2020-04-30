var express = require('express');
var app = express();

app.use((req, res, next) => {
    console.log("Start");
    next();
});

app.get('/', (req, res, next) => {
    res.send("Middle");
    next();
});

app.use('/', (req, res) => {
    console.log('End');
});

app.listen(3000);