const express = require('express');
const axios = require('axios')
const fs = require('fs');
const app = express();

app.set('view engine', 'pug');

async function updateData() {
    const info = await axios.get('https://randomuser.me/api/?results=25');
    fs.writeFileSync('db.json', info.results, (err) => {
        if (err) {
            throw err;
            console.log(err);
        }
    });
}

app.get('/', async(req, res) => {
    updateData();
    const query = await axios.get('http://localhost:3001/results');
    res.render('index', { employees: query.data });
});

app.listen(3000, () => {
    console.log("Listening on port 3000...");
});