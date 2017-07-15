import React, { Component } from 'react';
import * as api from '../../services/api';
import { connect } from 'react-redux';
import { setUser } from './actions';


export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = { loading: false };

        this.username = null;

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

                                        <label className="label">Usuário</label>
                                        <p className="control">
                                            <input className="input" type="text" placeholder="Your username..." onChange={this.handleChange} />
                                        </p>

                                        <div className="control is-grouped">
                                            <p className="control">
                                                <button className={buttonClasses}>Enter</button>
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

    submit(event) {
        event.preventDefault();
        this.setState({ loading: true });

        api.login(this.username)
            .then(() => {
                this.setState({ loading: false });
                this.props.setUser(this.username);
            }, err => {
                this.setState({ loading: false });
                console.log(err)
            });
    }

    handleChange(event) {
        this.username = event.target.value;
    }
}

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => {
        dispatch(setUser(user));
    }
});

const Container = connect(null, mapDispatchToProps)(Login);

export default Container;