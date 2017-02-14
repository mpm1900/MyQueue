import React from 'react';
import {connect} from 'react-redux';
import {Client} from '../../../socket/events';
import * as Actions from '../../../stores/room/actions';
import {Map, fromJS} from 'immutable';
import './RoomHeader.scss';

@connect(mapStateToProps, Actions)
export class RoomHeaderComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    goToRoom(event) {
        if (event.key == 'Enter') {
            this.props.router.push('rooms/' + event.target.value);
            console.log(this.props.user);
            this.props.socket.emit(...Client.roomRequest(this.props.user.uid, event.target.value));
            event.target.value = '';
        }
    }

    render() {
        return (
            <div className="room-header row">
                <div className="room-header-info small-6 columns">
                    <h3 className="float-left">
                        {this.props.meta.locked ?
                            <i className="fa fa-lock lock-icon"></i>:
                            <i className="fa fa-unlock-alt lock-icon"></i>
                        }
                        {this.props.name}
                    </h3>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) { return {
    name: state.get('name'),
    users: state.get('users'),
    meta: state.get('meta')
}}
