const path = require('path');
const crypto = require('crypto');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const users = require('./users');
var app = express();
var server = require('http').createServer(app);
var socket = require('./socket');

const hash = crypto.createHash('sha256');

// == express configuration
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', 'server/views');
app.set('view engine', 'ejs');
app.use(express.static('wwwroot'));
// =================================

socket(server);

app.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '../wwwroot/index.html'));
});

app.get('/users', (req, res) => {
    return res.json(users.getUsers());
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {

    let newUser = req.body.username;

    if (users.userExists(newUser)) {
        return res.json({
            sucesso: false,
            mensagem: 'User already exists: ' + newUser
        });
    }
    else {
        users.addUser(newUser);

        res.json({
            success: true,
            user: newUser
        })
    }
});


let port = process.env.PORT || 1234;

server.listen(port);

console.log(`Server running at http://localhost:${port}`);

