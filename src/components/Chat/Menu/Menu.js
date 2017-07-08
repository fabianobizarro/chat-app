import React, { Component } from 'react';

import { connect } from 'react-redux';
import { removeUser } from '../../Login/actions';
import { clearMessages } from '../actions';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = { toggled: false };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.logout = this.logout.bind(this);
    }

    render() {

        let navToggleClasses = 'nav-toggle ' + this.state.toggled ? 'is-active' : '';
        let menuClasses = ' ' + this.state.toggled ? 'is-active' : '';

        return (
            <div className="nav has-shadow is-fixed">
                <div className="nav-left">
                    <div className="nav-item">
                        <strong>
                            @{this.props.user}
                        </strong>
                    </div>
                </div>
                <div className={"nav-right nav-menu " + (this.state.toggled ? 'is-active' : '')} id="menu-options">
                    <a href="#" className="nav-item is-tab" onClick={this.logout} >Logout</a>
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

    logout(e) {
        this.props.logout();
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(clearMessages());
        dispatch(removeUser());
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default Container;