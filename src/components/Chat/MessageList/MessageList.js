import React, { Component } from 'react';
import Message from '../Message/Message';
import MessageMe from '../Message/MessageMe';
import MessageOthers from '../Message/MessageOthers';
import NewUserMessage from '../Message/NewUserMessage';

import { connect } from 'react-redux';

class MessageList extends Component {

    renderMessages() {
        let { user } = this.props;
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
                {/*{JSON.stringify(this.props.messages)}*/}
                {this.renderMessages()}
            </section>
        );
    }
}

const mapStatToProps = (state) => ({
    user: state.user
});

const Container = connect(mapStatToProps)(MessageList);

export default Container;