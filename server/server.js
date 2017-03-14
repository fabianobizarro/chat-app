const path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var socket = require('./socket');

// == Configurações do express
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', 'server/views');
app.set('view engine', 'ejs');
app.use(express.static('wwwroot'));
// =================================

socket(server);

var _users = [];

function userAlreadyExists(username) {
    var result = false;

    for (var user in _users) {
        if (_users[user] == username)
            return true;
    }
    return result;
}

app.get('/', function(req, res) {
    console.log(__dirname, '../wwwroot/index.html')
    console.log(_users);
    res.sendfile(path.join(__dirname, '../wwwroot/index.html'));

        
});

app.get('/users', (req, res) => {
    res.json(_users);
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {

    var newUser = req.body.username;

    if (userAlreadyExists(newUser)) {
        return res.json({
            sucesso: false,
            mensagem: 'Já existe um usuário com o nome ' + newUser
        });
    }
    else {
        _users.push(newUser);

        res.json({
            sucesso: true,
            usuario: newUser
        })
    }
});


const port = process.env.APP_PORT || 1234;
server.listen(port);

console.log(`Server running at http://localhost:${port}`);

