import React, { Component } from 'react';

class MessageOthers extends Component {

    render() {
        
        return (
            <div className="box notification message-others animated fadeIn">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>@{this.props.message.username}</strong> <small>  {this.props.message.date.toLocaleString()} </small>
                                <br />
                                {this.props.message.content}
                            </p>
                        </div>
                    </div>
                </article>

            </div>
        );
    }
}

export default MessageOthers;