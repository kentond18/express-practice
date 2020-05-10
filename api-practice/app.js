const express = require('express');
const axios = require('axios')
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

async function updateData() {
    let info = await axios.get('https://randomuser.me/api/?results=25');
    fs.writeFile(path.join(__dirname, 'db.json'), info, (err) => {
        if (err) {
            throw err;
            console.log(err);
        }
    });
}

app.get('/', async(req, res) => {
    updateData();
    res.sendFile(path.join(__dirname, 'db.json'));
});

app.listen(3000, () => {
    console.log("Listening on port 3000...");
});