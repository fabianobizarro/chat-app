import React, { Component } from 'react';
import Menu from './chat/Menu';
import Footer from './chat/Footer';
import MessageList from './chat/MessageList';
import SocketService from '../services/socketService';
import { getToken } from '../services/tokenService';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = { messages: this.getMessages() };
        this.onNewMessage = this.onNewMessage.bind(this);
        this.onNewUser = this.onNewUser.bind(this);
    }

    getMessages() {
        return [];
    }

    componentDidMount() {
        this.io = io();
        this.io.on('message', this.onNewMessage);
        this.io.on('newUser', this.onNewUser);
    }

    onNewMessage(message) {
        this.setState((prev) => {
            let messages = prev.messages.push(message);
            return messages;
        })
    }

    onNewUser(username) {
        this.setState((prev) => {
            let messages = prev.messages.push({ type: 'newUser', username: username });
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