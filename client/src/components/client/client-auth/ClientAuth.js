import React from 'react';
import {Client, Server} from '../../../socket/events';

import './ClientAuth.scss';

export class ClientAuthComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    logIn() {
        let username = this.refs.loginUsername.value;
        let password = this.refs.loginPassword.value;
        this.refs.loginUsername.value = '';
        this.refs.loginPassword.value = '';
        this.props.socket.emit(...Client.authResponse('LOGIN', username, password));
    }

    signUp() {
        let username = this.refs.signupUsername.value;
        let password = this.refs.signupPassword.value;
        this.refs.signupUsername.value = '';
        this.refs.signupPassword.value = '';
        this.props.socket.emit(...Client.authResponse('NEW', username, password));
    }

    render() {
        return (
            <div className="client-auth">
                <div className="row">
                    <div className="small-12 medium-6 columns">
                        <h4>Log in</h4>
                        <input type="text" ref="loginUsername" placeholder="username" />
                        <input type="password" ref="loginPassword" placeholder="password" />
                        <a className="button" onClick={() => this.logIn()}>Log In</a>
                    </div>
                    <div className="small-12 medium-6 columns">
                        <h4>Sign Up</h4>
                        <input type="text" ref="signupUsername" placeholder="username" />
                        <input type="password" ref="signupPassword" placeholder="password" />
                        <a className="button" onClick={() => this.signUp()}>Sign Up</a>
                    </div>
                </div>
            </div>
        );
    }
}