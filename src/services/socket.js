import SocketClient from 'socket.io-client';

const io = SocketClient();


export function on(eventName, callback) {
    if (io) {
        io.on(eventName, (data) => {
            callback(data);
        })
    }
}

export function onMessage(callback) {
    on('message', callback);
}

export function onNewUser(callback) {
    on('newUser', callback);
}

export function emit(eventName, data) {
    if (io) {
        io.emit(eventName, data);
    }
}
