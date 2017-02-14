import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../../stores/room/actions';
import {Map, fromJS} from 'immutable';

import {RoomQueueComponent} from '../room-queue/RoomQueue';
import {RoomPlayerComponent} from '../room-player/RoomPlayer';
import {RoomHeaderComponent} from '../room-header/RoomHeader';
import {RoomTrackSearchComponent} from '../room-track-search/RoomTrackSearch';
import {RoomChatComponent} from '../room-chat/RoomChat';

import './RoomBody.scss';

@connect(mapStateToProps, Actions)
export class RoomBodyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            view: 'SEARCH'
        }
    }

    changeView(view, event) {
        if (view != this.state.view) {
            this.setState({ view: view });
        }
    }

    getTweets() {
        fetch('https://api.twitter.com/1.1/search/tweets.json')
            .then(data => {
                console.log(data);
            });
    }

    render() {
        return (
            <div className="room-body">
                <RoomHeaderComponent socket={this.props.socket} router={this.props.router} user={this.props.user} userList={this.props.userList} />
                <RoomPlayerComponent socket={this.props.socket} user={this.props.user} />
                <ul className="horizontal menu views">
                    {this.state.view == 'SEARCH' ?
                        <li className="active-view"><a onClick={(event) => this.changeView('SEARCH', event)}><i className="fa fa-search"></i> Add Tracks</a></li>:
                        <li><a onClick={(event) => this.changeView('SEARCH', event)}><i className="fa fa-search"></i> Add Tracks</a></li>
                    }
                    {this.state.view == 'QUEUE' ?
                        <li className="active-view"><a onClick={(event) => this.changeView('QUEUE', event)}><i className="fa fa-list-ol"></i> Queue ({this.props.queue.size})</a></li>:
                        <li><a onClick={(event) => this.changeView('QUEUE', event)}><i className="fa fa-list-ol"></i> Queue ({this.props.queue.size})</a></li>
                    }
                    {this.state.view == 'CHAT' ?
                        <li className="active-view"><a onClick={(event) => this.changeView('CHAT', event)}><i className="fa fa-comments"></i> Chat</a></li>:
                        <li><a onClick={(event) => this.changeView('CHAT', event)}><i className="fa fa-comments"></i> Chat</a></li>
                    }
                </ul>
                {this.state.view == 'QUEUE' ?
                    <RoomQueueComponent />:
                    null
                }
                {this.state.view == 'SEARCH' ?
                    <RoomTrackSearchComponent user={this.props.user} />:
                    null
                }
                {this.state.view == 'CHAT' ?
                    <RoomChatComponent socket={this.props.socket} user={this.props.user} userList={this.props.userList} />:
                    null
                }
            </div>
        );
    }

}

function mapStateToProps(state) { return {
    name: state.get('name'),
    current: state.get('current'),
    queue: state.get('queue'),
    users: state.get('users'),
    chat: state.get('chat'),
    meta: state.get('meta')
}}