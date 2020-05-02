const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({ secret: "Your secret key" }));

var Users = [];

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    if (!req.body.id || !req.body.password) {
        res.status("400");
        res.send("Invaid details!");
    } else {
        Users.filter((user) => {
            if (user.id === req.body.id) {
                res.render('signup', {
                    message: "User already exists! Login or choose another user id"
                });
            }
        });
        var newUser = { id: req.body.id, password: req.body.password };
        Users.push(newUser);
        req.session.user = newUser;
        res.redirect('/protected_page');
    }
});

function checkSignIn(req, res) {
    if (req.session.user) {
        next();
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err);
    }
}

app.get('/protected_page', checkSignIn, (req, res) => {
    res.render('protected_page', { id: req.session.user.id })
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    console.log(Users)
    if (!req.body.id || !req.body.password) {
        res.render('login', { message: "Please enter both id and password" });
    } else {
        Users.filter((user) => {
            if (user.id === req.body.id && user.password === req.body.password) {
                req.session.user = user;
                res.redirect('/protected_page');
            }
        });
        res.render('login', {
            message: "Invalid credentials!"
        });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log("User logged out.");
    });
    res.redirect('/login');
});

app.use('/protected_page', (err, req, res, next) => {
    console.log(err);
    res.redirect('/login');
})

app.listen(3000);