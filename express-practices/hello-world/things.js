var express = require('express');
var router = express.Router();

router.use('/', (req, res, next) => {
    console.log("A request for things received at " + Date.now());
    next();
});

router.get('/', (req, res) => {
    res.send('GET route on things.');
});
router.post('/', (req, res) => {
    res.send('POST route on things.');
});

router.get('/:name/:id', (req, res) => {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

router.get('/:id([0-9]{5})', (req, res) => {
    res.send('id: ' + req.params.id);
})

module.exports = router;