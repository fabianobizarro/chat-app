import React, { Component } from 'react';
import {deleteToken} from '../../services/tokenService';

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
                        logo
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

    logout(e){
        deleteToken();
        this.props.onLogout();
    }
}

export default Menu;