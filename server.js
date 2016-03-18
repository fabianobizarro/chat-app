var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// == Configurações do express
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', 'app/views');
app.set('view engine', 'ejs');
app.use(express.static('wwwroot'));
// =================================


// Socket configs
io.on('connection', (socket) => {

    io.on('newUser', function(usuario) {
        console.log('Usuário conectado: ' + usuario);
        io.emit('chatMessage', { userName: usuario, message: usuario + ' acabou de entrar na conversa!' });
    });

    // socket.emit('msg', { hello: 'world' });
    socket.on('chatMessage', function (data) {
        console.log(data);
    });
});
// ======================================


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
    
    console.log(_users);
    
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
        _users.push(newUser);
        
        res.json({
            sucesso: true,
            usuario: newUser
        })
    }
});




var port = 1234;
server.listen(port);

console.log('Server running at Http://localhost:' + port);

