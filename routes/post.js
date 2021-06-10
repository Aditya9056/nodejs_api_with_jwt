const router = require('express').Router();
const verify = require('./verify_token');

router.get('/', verify , (req, res) => {
    res.json({
        post:{
            title: 'data',
            description: 'random data'
        }
    });
});


module.exports = router;