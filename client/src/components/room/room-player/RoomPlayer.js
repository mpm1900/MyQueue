import React from 'react';
import {connect} from 'react-redux';
import {Client, Server} from '../../../socket/events';
import {Map, List, toJS, fromJS} from 'immutable';
import * as Actions from '../../../stores/room/actions';
import {SoundcloudPlayerComponent} from './soundcloud-player/SoundcloudPlayer';
import {YoutubePlayerComponent} from './youtube-player/YoutubePlayer';
import {EmptyPlayerComponent} from './empty-player/EmptyPlayer';
import './RoomPlayer.scss';

@connect(mapStateToProps, Actions)
export class RoomPlayerComponent extends React.Component {



    render() {
        return (
            <div className="room-player">
                {this.props.current.get('type') == 'yt' ?
                    <YoutubePlayerComponent socket={this.props.socket} />:
                    null
                }
                {this.props.current.get('type') == 'sc' ?
                    <SoundcloudPlayerComponent socket={this.props.socket} />:
                    null
                }
                {!this.props.current.get('type') ?
                    <EmptyPlayerComponent />:
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
    meta: state.get('meta')
}}