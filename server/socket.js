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
            io.emit('newUser', usuario);
        });

        socket.on('disconnect', function () {
            io.emit('user disconnected');
        });

        socket.on('message', function (data) {
            io.emit('message', data);
        });
    });
}