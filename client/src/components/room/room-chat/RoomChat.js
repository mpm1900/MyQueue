import React from 'react';
import {connect} from 'react-redux';
import {Client, Server} from '../../../socket/events';
import * as Actions from '../../../stores/room/actions';
import './RoomChat.scss';
import {List, Map, toJS, fromJS} from 'immutable';

@connect(mapStateToProps, Actions)
export class RoomChatComponent extends React.Component {

    constructor(props) {
        super(props);
        this.props.socket.on(Server.ROOM_CHAT, (event) => {
            this.props.chatAddAuto(fromJS(event.action.chat), this.props.name);
        });
    }

    addChat(event) {
        if (event.key == 'Enter') {
            let message = event.target.value;
            let username = this.props.user.username;
            event.target.value = '';

            if (message && username) {
                this.props.chatAdd(Map({
                    type: 'USER',
                    message: message,
                    user: this.props.user.uid
                }), this.props.name);
            }
        }
    }


    render() {
        //console.log(this.props.users);
        //console.log(this.props.userList);
        //{chat.get('message')}
        //{this.props.userList[chat.get('user')]}
        console.log(this.props.chat.toJS());
        this.props.chat.get('messages').map(chat => {
            console.log('chat: ', chat.get('message'));
        });
        return (
            <div className="room-chat">
                <div className="room-chat-users">
                    <h5>Users</h5>
                    <ul>
                        {this.props.users.map(user => (
                            <li key={user}>{this.props.userList[user].username}</li>
                        ))}
                    </ul>
                </div>
                <div className="chat">
                    <div className="chat-messages">
                        {this.props.chat ?
                            <ul>
                                {this.props.chat.get('messages').map((chat) => (
                                    chat.get('type') == 'USER' ?
                                    <li className="chat-user">
                                        <div className="chat-message-user">
                                            <span>{this.props.userList[chat.get('user')].username}</span>
                                        </div>
                                        <div className="chat-message-text">
                                            <span>{chat.get('message')}</span>
                                        </div>
                                    </li>:
                                    <li className="chat-system">
                                        <div className="chat-message-text">
                                            <span>{chat.get('message')}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>:
                            null
                        }
                    </div>
                    <div className="chat-form">
                        <input type="text" onKeyUp={(event) => this.addChat(event)} />
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) { return {
    name: state.get('name'),
    users: state.get('users'),
    chat: state.get('chat') || Map({messages: List()}),
    meta: state.get('meta')
}}