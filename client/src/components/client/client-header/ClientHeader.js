import React from 'react';
import {Client, Server} from '../../../socket/events';
import {Link} from 'react-router'
import './ClientHeader.scss';

export class ClientHeaderComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    logOut() {
        let uid = sessionStorage.getItem('uid');
        let sid = sessionStorage.getItem('sid');
        this.props.socket.emit(...Client.authLogout(uid, sid));
        sessionStorage.removeItem('uid');
        sessionStorage.removeItem('sid');
    }

    goToRoom(event) {
        if (event.key == 'Enter') {
            location.href = '#/rooms/' + event.target.value;
            location.reload();
        }
    }


    render() {
        return (
            <div className="client-header">
                <div className="top-bar">
                    <div className="float-left">
                        <ul className="menu">
                            <li className="menu-text brand"><a href="/">MyQueue</a></li>
                        </ul>
                    </div>
                    <div className="float-right">
                        {this.props.user ?
                            <ul className="menu">
                                <li>
                                    <div className="go-to-room-header">
                                        <input type="text" placeholder="Go to room" className="float-right" onKeyUp={(event) => this.goToRoom(event)}/>
                                    </div>
                                </li>
                                <li><a href="/" className="button" onClick={() => this.logOut()}><i className="fa fa-sign-out"></i> <strong>{this.props.user.username}</strong></a></li>
                            </ul>:
                            null
                        }
                    </div>
                </div>
            </div>
        );
    }
}