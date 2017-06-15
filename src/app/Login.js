import React, { Component } from 'react';
import { setToken } from '../services/tokenService';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = { loading: false };

        this.username = null;

        this.onButtonClick = this.onButtonClick.bind(this);
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
                                    <label className="label">Usuário</label>
                                    <p className="control">
                                        <input className="input" type="text" placeholder="Seu nome de usuário aqui..." onChange={this.handleChange} />
                                    </p>

                                    <div className="control is-grouped">
                                        <p className="control">
                                            <button className={buttonClasses} onClick={this.onButtonClick}>Enviar</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        );
    }

    onButtonClick(event) {
        this.setState({ loading: true });
        axios.post('/login', { username: this.username })
            .then(result => {
                setToken(this.username);
                this.setState({ loading: false });
                this.props.onLogin(this.username);
            }, err => {
                this.setState({ loading: false });
                console.log(err)
            });
    }

    handleChange(event) {
        this.username = event.target.value;
    }
}

export default Login;