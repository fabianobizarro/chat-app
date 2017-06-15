import React, { Component } from 'react';
import Login from './Login';
import Chat from './Chat';

import { getToken } from '../services/tokenService';

class App extends Component {

    constructor(props) {
        super(props);
        this.onUserDefined = this.onUserDefined.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentWillMount() {
        let token = getToken();
        this.setState({ token });
    }

    render() {
        if (this.state.token != undefined)
            return <Chat onLogout={this.onLogout} />;
        else
            return <Login onLogin={this.onUserDefined} />;
    }

    onLogout() {
        let token = undefined;
        this.setState({ token });
    }


    onUserDefined(username) {
        let token = username;
        this.setState({ token });
    }
}

export default App;