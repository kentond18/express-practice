const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('name', 'express', { maxAge: 360000 }).send('cookie set'); // sets name = express
});

app.get('/clear_cookie_name', (req, res) => {
    res.clearCookie('name');
    res.send('cookie name cleared');
});

app.listen(3000);