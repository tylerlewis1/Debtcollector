const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) =>{
    var data = JSON.parse(fs.readFileSync(__dirname + "/data.json"));
    res.json({AMOUNT_OWED: data.AMOUNT_OWED});
});

module.exports = router;