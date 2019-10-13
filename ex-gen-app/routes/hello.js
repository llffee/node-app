var express = require('express');
var router = express.Router();

router.get('/',(req, res, next) => {
    var msg = '*Please write something, and send it!';
    if (req.session.message != undefined) {
        msg = "Last Message: " + req.session.message;
    }    
    var data = {
        title: 'Hello',
        content: msg
    };
    res.render('hello', data);
});

router.post('/post',(req, res, next) => {
    var msg = req.body['message'];
    req.session.message=msg;
    var data = {
        title: 'Hello!',
        content: 'Last message: ' + req.session.message,
    };
    res.render('hello', data);
});

module.exports = router;