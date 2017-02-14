import React from 'react';
import {Provider} from 'react-redux';
import {Map, List, fromJS} from 'immutable';
import {Client, Server} from '../../socket/events';
import YTSearch from 'youtube-api-search';
import makeStore from '../../stores/room/store';
import * as Actions from '../../stores/room/actions';
import {RoomBodyComponent} from './room-body/RoomBody';

const API_KEY = 'AIzaSyBYf1d1OI9RrbBZ8ox-HppCUqyndH8herc';

export class RoomComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
        const socket = this.props.route.socket;

        this.state = {
            store: makeStore(socket),
            authorized: null,
            users: []
        };

        socket.emit(...Client.roomRequest(sessionStorage.getItem('uid'), this.props.params.room));
        socket.on(Server.ROOM_SUCCESS, (event) => {

            this.state.store.dispatch(Actions.setState(fromJS(event.room)));
            this.setState({
                authorized: true,
                users: event.users
            });
        });
        socket.on(Server.ROOM_USERS_JOIN, (event) => {
            console.log('user joined');
            console.log(event.roomUsers);
            this.setState({
                users: event.users
            });
            this.state.store.dispatch(Actions.setState(Map({users: fromJS(event.roomUsers)})));
            this.state.store.dispatch(Actions.chatAdd(Map({
                type: 'SYSTEM',
                message: 'A user joined the room.',
                user: 'SYSTEM'
            }), this.props.params.room));
        });
        socket.on(Server.ROOM_USERS_LEAVE, (event) => {
            console.log('user left');
            console.log(event.roomUsers);
            this.state.store.dispatch(Actions.setState(Map({users: fromJS(event.roomUsers)})));
            this.setState({
                users: event.users
            });
            this.state.store.dispatch(Actions.chatAdd(Map({
                type: 'SYSTEM',
                message: 'A user left the room.',
                user: 'SYSTEM'
            }), this.props.params.room));
        });
        socket.on(Server.ROOM_ENQUEUE, (event) => {
            console.log('room enqueue');
            let action = {
                type: event.action.type,
                entry: fromJS(event.action.entry)
            };
            this.state.store.dispatch(action);
        });
        socket.on(Server.ROOM_DEQUEUE, (event) => {
            console.log('room dequeue');
            this.state.store.dispatch(event.action)
        });
        socket.on(Server.ROOM_PROMOTE, (event) => {
            console.log('room promote');
            let action = {
                type: event.action.type,
                entry: fromJS(event.action.entry)
            };
            this.state.store.dispatch(action);
        });
        socket.on(Server.ROOM_DEMOTE, (event) => {
            console.log('room demote');
            let action = {
                type: event.action.type,
                entry: fromJS(event.action.entry)
            };
            this.state.store.dispatch(action);
        });
        socket.on(Server.ROOM_REMOVE, (event) => {
            console.log('room remove');
            let action = {
                type: event.action.type,
                entry: fromJS(event.action.entry)
            };
            this.state.store.dispatch(action);
        });

        socket.on('TWITTER', (event) => {
            console.log(event);
            YTSearch({
                key: API_KEY,
                term: event.query,
                maxResults: 25
            }, (videos) => {
                if (videos[0]) {
                    let entry = Map({
                        type: 'yt',
                        title: videos[0].snippet.title,
                        thumbnail: videos[0].snippet.thumbnails.default.url,
                        trackId: videos[0].id.videoId,
                        addedBy: 'Twitter'
                    });

                    this.state.store.dispatch(Actions.queueEnqueueAuto(entry, event.room));
                }
            });
        });
    }

    render() {
        return (
            <Provider store={this.state.store}>
                {this.state.authorized == null ?
                    <div>
                        <div className="loader">
                            <div className="spinner">
                                <div className="rect1"></div>
                                <div className="rect2"></div>
                                <div className="rect3"></div>
                                <div className="rect4"></div>
                                <div className="rect5"></div>
                            </div>
                        </div>
                    </div>:
                    <RoomBodyComponent router={this.context.router} socket={this.props.route.socket} user={this.props.route.user} userList={this.state.users} />
                }
            </Provider>
        );
    }
}

RoomComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};