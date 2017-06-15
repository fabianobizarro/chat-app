import React, { Component } from 'react';

class NewUserMessage extends Component {

    render() {
        return (
            <div className="box notification message-others">
                <article className="media">
                    <div className="media-content">
                        <div className="container">
                            <div className="content">
                                <p>
                                    <strong>@{this.props.username}</strong> acabou de entrar!
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}

export default NewUserMessage;