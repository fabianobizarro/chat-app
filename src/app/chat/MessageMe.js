import React, { Component } from 'react';

class MessageMe extends Component {

    render() { 

        return (
            <div className="box notification is-info message-me">
                <article className="media">
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <text className="is-pulled-right"><strong>@{this.props.message.username}</strong> <small> {this.props.message.date.toString('dd/MM/yyyy')} </small></text>
                                <br />
                                {this.props.message.content}
                            </p>
                        </div>
                    </div>
                    <div className="media-right">
                        <figure className="image is-64x64">
                            <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image" />
                        </figure>
                    </div>
                </article>
            </div>
        );
    }
}

export default MessageMe;