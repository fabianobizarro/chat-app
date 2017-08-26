import React, { Component } from 'react';
import { emit } from '../../../services/socket';
import { connect } from 'react-redux';


export class Footer extends Component {

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

    sendMessage() {
        if (this.state.message !== '') {

            emit('message', {
                to: this.props.thread,
                content: this.state.message,
                date: new Date(),
                from: this.props.username
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
                                <div className="field has-addons">
                                    <div className="control is-expanded">
                                        <input
                                            type="text"
                                            className="input"
                                            value={this.state.message}
                                            onChange={this.handleChange}
                                            placeholder="Message" />
                                    </div>
                                    <div className="control">
                                        <button
                                            type="submit"
                                            className="button is-info"
                                            onClick={this.sendMessage}
                                            tabIndex="-1">Send</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

const mapStateToProps = (state) => ({
    username: state.user,
    thread: state.selectedThread
});

const Container = connect(mapStateToProps)(Footer);

export default Container;