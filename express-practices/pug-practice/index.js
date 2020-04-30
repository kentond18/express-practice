var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/first_template', (req, res) => {
    res.render('first_view');
});

app.get('/dynamic_view', (req, res) => {
    res.render('dynamic_view', {
        name: "LocalHost:3000",
        url: "http://localhost:3000/dynamic_view"
    });
});

app.get('/simple_template', (req, res) => {
    res.render('simple_template', {
        user: { name: "Ayush", age: "20" }
    });
});

app.get('/components', (req, res) => {
    res.render('content');
});

app.get('/hello', (req, res) => {
    res.send("Hello, world!");
});

app.post('/hello', (req, res) => {
    res.send("You just called the post method at '/hello'\n");
});


app.get('*', (req, res) => {
    res.send('Sorry, this is an invalid URL.');
});

app.listen(3000);