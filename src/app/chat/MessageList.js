import React, { Component } from 'react';
import Message from './Message';
import MessageMe from './MessageMe';
import MessageOthers from './MessageOthers';
import NewUserMessage from './NewUserMessage';
import { getToken } from '../../services/tokenService';

class MessageList extends Component {

    renderMessages() {
        let user = getToken();
        return this.props.messages.map((m, i) => {

            if (m.type == 'newUser') {
                return (
                    <div className="columns" key={i}>
                        <div className="column is-half">
                            <NewUserMessage username={m.username} />
                        </div>
                    </div>
                );
            }

            if (m.username != user) {
                return (
                    <div className="columns" key={i}>
                        <div className="column is-half">
                            <MessageOthers sendByUser={m.username == user} message={m} />
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div className="columns" key={i}>
                        <div className="column is-offset-half is-half">
                            <MessageMe sendByUser={m.username == user} message={m} />
                        </div>
                    </div>
                );
            }
        });
    }

    render() {
        return (
            <section className="section container main">
                {this.renderMessages()}
            </section>
        );
    }
}

export default MessageList;