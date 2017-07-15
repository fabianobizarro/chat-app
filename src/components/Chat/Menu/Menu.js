import React, { Component } from 'react';

import { connect } from 'react-redux';
import { removeUser } from '../../Login/actions';
import { clearMessages, toggleUsersMenu } from '../actions';

export class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = { toggled: false };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.logout = this.logout.bind(this);
        this.clearMessages = this.clearMessages.bind(this);
    }

    render() {

        let navToggleClasses = 'nav-toggle ' + this.state.toggled ? 'is-active' : '';
        let menuClasses = ' ' + this.state.toggled ? 'is-active' : '';

        return (
            <div className="nav has-shadow is-fixed">
                <div className="nav-left nav-menu">
                    <div className="nav-item is-tab">
                        <a onClick={e => this.props.toggleUsersMenu()}>
                            {this.props.showUsers ? "Hide Users" : "Show Users"}
                        </a>
                    </div>
                    <div className="nav-item">
                        <strong>
                            @{this.props.user}
                        </strong>
                    </div>
                </div>
                <div className={"nav-right nav-menu " + (this.state.toggled ? 'is-active' : '')} id="menu-options">
                    <a href="#" className="nav-item is-tab" onClick={this.logout} >Logout</a>
                    <a href="#" className="nav-item is-tab" onClick={this.clearMessages} >Clear Messages</a>
                </div>
                <span className={"nav-toggle " + (this.state.toggled ? 'is-active' : '')} onClick={this.toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div>
        );
    }

    toggleMenu(e) {
        this.setState((prev) => {
            return { toggled: !prev.toggled };
        })
    }

    clearMessages() {
        this.props.clearMessages();
    }

    logout(e) {
        this.props.logout();
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    showUsers: state.showUsers
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(clearMessages());
        dispatch(removeUser());
    },
    clearMessages: () => {
        dispatch(clearMessages());
    },
    toggleUsersMenu: () => {
        dispatch(toggleUsersMenu());
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default Container;