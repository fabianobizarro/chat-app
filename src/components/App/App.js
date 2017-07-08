import React, { Component } from 'react';
import Login from '../Login/Login';
import Chat from '../Chat/Chat';
import { connect } from 'react-redux';

import './app.css';

export const App = ({user}) => {
    if (user)
        return <Chat />
    else
        return <Login />
};


const mapStateToProps = (state) => ({
    user: state.user
});

const Container = connect(mapStateToProps)(App);

export default Container;