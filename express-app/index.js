var express = require('express');
var ejs = require("ejs");

var app = express()
app.engine('ejs',ejs.renderFile);
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var data = {
    'Taro':'taro@yamada',
    'Hanako':'hanako@flower',
    'Sachiko':'sachiko@happy',
    'Ichiro':'ichiro@baseball',
}

app.get('/', (req, res) => {
    var msg = 'This is Index Page!<br>' + '※データを表示します。';
    var url = 'other?name=taro&pass=yamada';
    // index.ejsをレンダリングする
    res.render('index.ejs',
        {
            title: 'Index',
            content: msg,
            data: data,
        });
});

// POST送信の処理
app.post('/',(req, res) => {
    var msg = 'This is Posted Page!<br>' + 'あなたは「<b>' + req.body.message + '<b>」と送信しました。';
    res.render('index.ejs',
    {
        title: 'Posted',
        content: msg,
    });
});

var server = app.listen(3000, () => {
    console.log('Server is running!');
})