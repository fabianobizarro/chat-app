import React, { Component } from 'react';
import Menu from './chat/Menu';
import Footer from './chat/Footer';
import MessageList from './chat/MessageList';
import SocketService from '../services/socketService';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = { messages: this.getMessages() };
        this.io = io();
    }

    getMessages() {
        return [];
    }

    componentDidMount() {

        this.io.emit('message', 'heelo world');
        this.io.on('message', (data) => {
            console.log(data);
        });

        

    }

    onNewMessage(message) {
        this.setState((prev) => {
            let messages = prev.messages.push({ username: 'fabiano', content: 'hello world!', date: new Date(), type: 'message' });
            return messages;
        })
    }

    render() {
        return (
            <div>
                <Menu onLogout={this.props.onLogout} />
                <MessageList messages={this.state.messages} />
                <Footer />
            </div>
        );
    }
}

export default Chat;