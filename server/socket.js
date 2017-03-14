module.exports = function (server) {

    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('new connection');
        /**
         * Events:
         * message
         * newUser
         */

        socket.on('newUser', function (usuario) {
            console.log('Usuário conectado: ' + usuario);
            io.emit('chatMessage', { userName: usuario, message: usuario + ' acabou de entrar na conversa!', data: Date.now() });
            io.emit('newUser', usuario);
        });

        socket.on('disconnect', function () {
            io.emit('user disconnected');
        });

        socket.on('message', function (data) {
            console.log('new message')
            console.log(data)
            
            io.emit('chatMessage', data);
        });
    });
}