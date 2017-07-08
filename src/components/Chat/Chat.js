import React, { Component } from 'react';
import Menu from './Menu/Menu';
import Footer from './Footer/Footer';
import MessageList from './MessageList/MessageList';
import SocketService from '../../services/socket';

import SocketClient from 'socket.io-client';
import { addMessage } from './actions';

import { connect } from 'react-redux';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.onNewMessage = this.onNewMessage.bind(this);
        this.onNewUser = this.onNewUser.bind(this);
    }

    componentDidMount() {
        this.io = SocketClient('http://localhost:1234');
        this.io.on('message', this.onNewMessage);
        this.io.on('newUser', this.onNewUser);
    }

    onNewMessage(message) {
        this.props.addMessage(message);
    }

    onNewUser(username) {
        console.log(username)
        this.props.addMessage({ type: 'newUser', username: username });
    }

    render() {
        return (
            <div>
                <Menu />
                <MessageList messages={this.props.messages} />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    messages: state.messages
});

const mapDispatchToProps = (dispatch) => ({
    addMessage: (message) => {
        dispatch(addMessage(message));
    }
})

const Container = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default Container;