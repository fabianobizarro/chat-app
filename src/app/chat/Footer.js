import React, { Component } from 'react';
import SocketService from '../../services/socketService';
import { getToken } from '../../services/tokenService';

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
        this.io = io();
    }

    sendMessage() {
        if (this.state.message) {
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
                            <div className="control is-grouped">
                                <p className="control is-expanded">
                                    <textarea className="textarea" value={this.state.message} onChange={this.handleChange} placeholder="Message"></textarea>
                                </p>
                                <p className="control">
                                    <a className="button is-info" onClick={this.sendMessage}>Send</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;