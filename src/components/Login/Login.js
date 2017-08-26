import React, { Component } from 'react';
import * as api from '../../services/api';
import { connect } from 'react-redux';
import { setUser } from './actions';


export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = { loading: false, username: '' };

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        document.title = "Login";
    }

    render() {
        let buttonClasses = this.state.loading ? "button is-primary is-loading" : "button is-primary";
        return (
            <section className="hero is-default is-fullheight">
                <div className="hero-body">
                    <div className="container">

                        <div className="columns">
                            <div className="column is-offset-one-quarter is-half">
                                <div className="box">
                                    <form onSubmit={this.submit}>

                                        <label className="label">User</label>
                                        <p className="control">
                                            <input className="input" type="text" placeholder="Your username..." onChange={this.handleChange} />
                                        </p>
                                        <br />
                                        <div className="control">
                                            <p className="control">
                                                <button className={buttonClasses}>Enter as @{this.formattedUserName(this.state.username) || 'your_user_name'}</button>
                                            </p>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        );
    }

    formattedUserName(name) {
        if (name)
            return name.replace(/[ ]/g, '');

        return name;
    }

    submit(event) {
        event.preventDefault();
        this.setState({ loading: true });

        let login = this.formattedUserName(this.state.username);

        api.login(login)
            .then(() => {
                this.setState({ loading: false });
                this.props.setUser(login);
            }, err => {
                this.setState({ loading: false });
            });
    }

    handleChange(event) {
        this.setState({ username: event.target.value });
    }
}

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => {
        dispatch(setUser(user));
    }
});

const Container = connect(null, mapDispatchToProps)(Login);

export default Container;