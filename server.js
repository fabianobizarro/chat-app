var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', 'app/views');
app.set('view engine', 'ejs');
app.use(express.static('wwwroot'));

app.get('/', function(req, res) {

    console.log(req.cookies);

    if (req.cookies.userSession) {
        res.json({ teste: 'teste' });

    }
    else
        res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {

    

});

app.listen(1234);

console.log('server running');

