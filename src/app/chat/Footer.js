import React, { Component } from 'react';
import SocketService from '../../services/socketService';
import { getToken } from '../../services/tokenService';

import SocketClient from 'socket.io-client';


class Footer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

    }

    handleChange(e) {
        this.setState({ message: e.target.value });
    }

    componentDidMount() {
        this.io = SocketClient('http://localhost:1234');
    }

    sendMessage() {
        if (this.state.message !== '') {
            this.io.emit('message', {
                content: this.state.message,
                date: new Date(),
                username: getToken()
            });
            this.setState({ message: '' });
        }
    }

    render() {
        return (
            <footer className="footer shadow-footer">
                <div className="content">
                    <div className="columns">
                        <div className="column">
                            <form method="POST" onSubmit={e => e.preventDefault()}>
                                <div className="control is-grouped">
                                    <p className="control is-expanded">
                                        <input type="text" className="textarea" value={this.state.message} onChange={this.handleChange} placeholder="Message" />
                                    </p>
                                    <p className="control">
                                        <button type="submit" className="button is-info" onClick={this.sendMessage} tabIndex="-1">Send</button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;