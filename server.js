var http = require('http');
var app = require('express')();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.user(cookieParser());

app.get('/', function (req, res) {
    
})


