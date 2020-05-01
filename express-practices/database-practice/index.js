const express = require('express');
const app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

app.set('view engine', 'pug');
app.set('views', './views');

var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});

var Person = mongoose.model("Person", personSchema);

app.get('/person', (req, res) => {
    res.render('person');
});

app.listen(3000);