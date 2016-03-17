var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// == Configurações do express
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', 'app/views');
app.set('view engine', 'ejs');
app.use(express.static('wwwroot'));
// =================================

var _users = ['fabiano', 'augusto'];

function userAlreadyExists(username) {
    var result = false;

    for (var user in _users) {
        if (_users[user] == username)
            return true;
    }
    return result;
}

app.get('/', function(req, res) {

    if (req.cookies.userSession) {
        res.render('index');
    }
    else
        res.redirect('/login');
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
        res.json({
            sucesso: true,
            usuario: newUser
        })
    }
});

app.listen(1234);

console.log('server running');

