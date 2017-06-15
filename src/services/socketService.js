class SocketService {

    constructor() {
        this.socket = io();
    }

    on(eventName, callback) {
        if (this.socket) {
            this.socket.on(eventName, (data) => {
                console.log(data);
                callback(data);
            })
        }
    }

    emit(eventName, data) {
        if (this.socket) {
            this.socket.emit(eventName, data);
        }
    }

    removeListener(eventName) {
        console.log('removeListener')
    }

}

export default SocketService;