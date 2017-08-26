import React, { Component } from 'react';
import './users.css';
import * as api from '../../../services/api'
import * as socket from '../../../services/socket'

import { setUsers, addThread, selectThread, toggleUsersMenu } from '../actions';

import { connect } from 'react-redux';

export class Users extends Component {

    constructor(p) {
        super(p);

        this.state = {
            opened: false
        }
    }

    componentDidMount() {
        let that = this;
        api.fetchUsers().then(users => {
            that.props.setUsers(users);
        });
    }


    render() {
        let show = this.props.opened;
        return (
            <div>
                <aside id="users" className="menu has-shadow" style={{ width: show ? "250px" : "0px" }}>
                    <p className="menu-label" style={{ marginLeft: '10px' }}>
                        Users
                    </p>
                    <ul className="menu-list">
                        {
                            this.props.users
                                .filter(u => {
                                    return u !== this.props.user
                                })
                                .map((u, i) => (
                                    <li key={i}>
                                        <a onClick={e => this.props.selectUser(u)}>
                                            @{u}
                                        </a>
                                    </li>
                                ))
                        }
                    </ul>

                </aside>

                <div id="main" style={{ marginLeft: this.props.opened ? "250px" : "0px" }}>
                    {this.props.children}
                </div>
            </div>

        );
    }
}

const mapState = (state) => ({
    users: state.users,
    user: state.user,
    opened: state.showUsers
});

const mapDispatch = (dispatch) => ({
    setUsers: (users) => {
        dispatch(setUsers(users));
    },
    selectUser: (user) => {
        dispatch(addThread(user));
        dispatch(selectThread(user));
        dispatch(toggleUsersMenu())
    }
})

const Container = connect(mapState, mapDispatch)(Users);

export default Container;