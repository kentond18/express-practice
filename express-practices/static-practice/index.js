var express = require('express');
var app = express();

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/main', (req, res) => {
    res.render('main');
});

app.get('*', (req, res) => {
    res.send('Sorry, this is an invalid URL.');
});

app.listen(3000);