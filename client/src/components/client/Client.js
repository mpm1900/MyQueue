import React from 'react';
import io from 'socket.io-client';
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from 'react-router';
import {Client, Server} from '../../socket/events';
import {handleAuthRequest, handleAuthSuccess, handleAuthError} from '../../socket/lib/auth';
import '../../../node_modules/foundation-sites/dist/foundation.min.css';
import './Client.scss';

import {ClientAuthComponent} from './client-auth/ClientAuth';
import {ClientHeaderComponent} from './client-header/ClientHeader';
import {ClientBodyComponent} from './client-body/ClientBody';
import {ClientHomeComponent} from './client-home/ClientHome';
import {RoomSearchComponent} from '../room/room-search/RoomSearch';
import {RoomComponent} from '../room/Room';

const socket = io(`${location.protocol}//${location.hostname}:3005`);

export class ClientComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {connected: false};
        socket.on(Server.AUTH_REQUEST, handleAuthRequest(socket, () => {this.setState({connected: true})}));
        socket.on(Server.AUTH_SUCCESS, handleAuthSuccess(socket, (user) => {this.setState({user: user, connected: true})}));
        socket.on(Server.AUTH_ERROR, handleAuthError(socket));
        socket.on(Server.AUTH_LOGOUT, () => {this.setState({user: null})});
    }


    render() {
        return (
            <div className="client">
                {this.state.connected == false ?
                    <div
                    ><div className="loader">
                        <div className="spinner">
                            <div className="rect1"></div>
                            <div className="rect2"></div>
                            <div className="rect3"></div>
                            <div className="rect4"></div>
                            <div className="rect5"></div>
                        </div>
                    </div></div>:
                    <div>
                        <ClientHeaderComponent user={this.state.user} socket={socket}/>
                        {!this.state.user ?
                            <ClientAuthComponent socket={socket}/> :
                            <Router history={hashHistory}>
                                <Route path='/' component={ClientBodyComponent}>
                                    <IndexRoute component={ClientHomeComponent} />
                                    <Route path="rooms" socket={socket} component={RoomSearchComponent} />
                                    <Route path="rooms/:room" user={this.state.user} socket={socket} component={RoomComponent} />
                                </Route>
                            </Router>
                        }
                    </div>
                }
            </div>
        );
    }
}