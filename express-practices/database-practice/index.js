const express = require('express');
const app = express();
const mongoose = require('mongoose');
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

app.post('/person', (req, res) => {
    var personInfo = req.body; //Get the parsed information

    if (!req.body.name || !req.body.age || !req.body.nationality) {
        res.render('show_message', {
            message: "Sorry, you provided wrong information",
            type: "error"
        });
    } else {
        var newPerson = new Person({
            name: req.body.name,
            age: req.body.age,
            nationality: req.body.nationality
        });

        newPerson.save(function(err, Person) {
            if (err)
                res.render('show_message', { message: "Database error", type: "error" });
            else
                res.render('show_message', {
                    message: "New person added",
                    type: "success",
                    person: req.body
                });
        });
    }
});

app.listen(3000);