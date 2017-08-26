import React, { Component } from 'react';
import Menu from './Menu/Menu';
import SideMenu from './Users/Users';
import Footer from './Footer/Footer';
import MessageList from './MessageList/MessageList';
import * as socket from '../../services/socket';

import { addMessage, addUser } from './actions';

import { connect } from 'react-redux';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.onNewMessage = this.onNewMessage.bind(this);
        this.onNewUser = this.onNewUser.bind(this);
    }

    componentDidMount() {
        socket.onNewUser(this.onNewUser);
        socket.onMessage(this.onNewMessage);
    }

    onNewMessage(message) {
        if (message.to === this.props.user)
            this.props.addMessage(message);
    }

    onNewUser(username) {
        console.log(username)
        this.props.addUser(username);
    }

    render() {
        return (
            <div>
                <SideMenu>
                    <Menu />
                    <MessageList messages={this.props.messages} />
                    <Footer />
                </SideMenu>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    messages: state.messages,
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    addMessage: (message) => {
        dispatch(addMessage(message));
    },
    addUser: (user) => {
        dispatch(addUser(user));
    }
})

const Container = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default Container;