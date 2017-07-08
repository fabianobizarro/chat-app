import React, { Component } from 'react';
import MessageMe from './MessageMe';
import MessageOthers from './MessageMe';

class Message extends Component {

    render() {
        if (this.props.sendByUser)
            return <MessageMe message={this.props.message} />
        else
            return <MessageOthers message={this.props.message} />
    }
}

export default Message;