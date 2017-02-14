import React from 'react';
import {Client} from '../../../socket/events';

export class RoomSearchComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
        const socket = this.props.route.socket;
        socket.emit(...Client.getRooms());
    }

    goToRoom() {
        let room = this.refs.room.value;
        this.context.router.push('/rooms/' + room);
        this.refs.room.value = '';
    }

    render() {
        return (
            <div className="room-search">
                <h4>Search Rooms</h4>
                <input type="text" ref="room" />
                <button className="button" onClick={() => this.goToRoom()}>Go!</button>
            </div>
        );
    }
}

RoomSearchComponent.contextTypes = {
    router: React.PropTypes.func.isRequired
};