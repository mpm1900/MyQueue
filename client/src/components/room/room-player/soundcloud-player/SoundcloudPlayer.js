import React from 'react';
import {connect} from 'react-redux';
import {Client, Server} from '../../../../socket/events';
import {SoundPlayerContainer} from 'react-soundplayer/addons';
import {PlayButton, Progress, Timer} from 'react-soundplayer/components';
import * as Actions from '../../../../stores/room/actions';
import {Map, List, toJS, fromJS} from 'immutable';
import './SoundcloudPlayer.scss';

const clientId = '08f566caed2cb85af62673834eaef2d4';

@connect(mapStateToProps, Actions)
export class SoundcloudPlayerComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    stopTrack() {
        console.log('SoundcloudPlayer: stop.');
        this.props.queueDequeueAuto(this.props.name);
    }

    startTrack() {
        console.log('SoundcloudPlayer: play.');
        this.props.playerPlay(this.props.name, 'sc', this.props.current.get('trackId'));
    }

    pauseTrack() {
        console.log('SoundcloudPlayer: pause.');
        this.props.playerPause(this.props.name, 'sc');
    }

    render() {
        console.log('SoundcloudPlayer: render.');
        return (
            <div className="soundcloud-player">
                    <SoundPlayerContainer
                        clientId={clientId}
                        resolveUrl={this.props.current.get('trackId')}
                        onStopTrack={() => this.stopTrack()}
                        onStartTrack={() => this.startTrack()}
                        onPauseTrack={() => this.pauseTrack()}
                    >

                        <_internal socket={this.props.socket} queueDequeue={this.props.queueDequeue}
                                   queueDequeueAuto={this.props.queueDequeueAuto} playerPause={this.props.playerPause}
                                   current={this.props.current} playerSeek={this.props.playerSeek} />
                    </SoundPlayerContainer>:
            </div>
        );
    }
}

class _internal extends React.Component {

    constructor(props) {
        super(props);
        //console.log('SoundcloudPlayer _internal: constructor.');
        this.state = {
            loaded: false
        };


        this.props.socket.on(Server.ROOM_PLAY, (event) => {
            if (event.action.player == 'sc' && event.action.trackId == this.props.current.get('trackId')) {
                this.props.soundCloudAudio.play();
            }
        });
        this.props.socket.on(Server.ROOM_PAUSE, (event) => {
            if (event.action.player == 'sc') {
                this.props.soundCloudAudio.pause();
            }
        });
        this.props.socket.on(Server.ROOM_SEEK, (event) => {
            if (event.action.player == 'sc') {
                console.log(event.action.time);
                this.props.soundCloudAudio.audio.currentTime = event.action.time;
            }
        })
    }

    componentDidUpdate() {
        if (this.props.track && !this.props.soundCloudAudio.playing) {
            if (!this.state.loaded) {
                if (this.props.track.title != this.state.oldTrack) {
                    this.setState({
                        loaded: true,
                        ended: false
                    });
                    this.props.soundCloudAudio.play();
                }
            }
        }

        if (this.props.currentTime == this.props.duration && this.props.duration != 0) {
            //this.props.soundCloudAudio.pause();
            //this.props.queueDequeueAuto(this.props.name);
            if (!this.state.ended) {
                this.setState({
                    loaded: false,
                    oldTrack: this.props.track.title,
                    ended: true
                });
            }
        }
    }

    next() {
        console.log('SoundcloudPlayer _internal: next.');
        this.props.playerPause(this.props.name, 'sc');
        this.props.soundCloudAudio.pause();
        if (!this.state.ended) {
            this.setState({
                loaded: false,
                oldTrack: this.props.track.title,
                ended: true
            });
        }
        this.props.queueDequeue(this.props.name);
    }

    toggleMute() {
        console.log('SoundcloudPlayer _internal: toggleMute.');
        this.setState({
            muted: !this.state.muted || false
        });
        let volume;
        if (!this.state.muted) {
            volume = 0;
        } else {
            volume = 1;
        }
        this.props.soundCloudAudio.audio.volume = volume;
        console.log(this.props.soundCloudAudio);
    }

    seek(progress) {
        const time = progress * this.props.duration;
        console.log('SEEK');
        console.log(time);
        this.props.playerSeek(time, 'sc', this.props.name);
    }

    render() {
        //console.log('SoundcloudPlayer _internal: constructor.');
        return (
            <div className="soundcloud-player_internal">
                <div className="sc-play-pause">
                    {this.props.track && this.props.track.artwork_url ?
                        <img src={this.props.track.artwork_url}/> :
                        null
                    }
                    <PlayButton className={"sc-pp-btn"} {...this.props} />
                </div>
                <div className="player-info" style={ this.props.track ? {background: this.props.track.waveform_url}: null}>
                    <h5><i className="fa fa-soundcloud"></i> {this.props.track ?
                        this.props.track.title :
                        ''
                    }</h5>
                    <Timer className="" duration={this.props.track ? this.props.track.duration / 1000 : 0}
                           currentTime={this.props.currentTime}/>
                </div>
                <div className="player-actions">
                    <a className="button" onClick={() => this.next()}><i className="fa fa-step-forward"></i></a>
                    <a className="button" onClick={() => this.toggleMute()}>
                        {this.state.muted ?
                            <i className="fa fa-volume-off"></i>:
                            <i className="fa fa-volume-up"></i>
                        }
                    </a>
                </div>
                <Progress
                    className="player-seek"
                    onSeekTrack={(event, time) => this.seek(event, time)}
                    value={this.props.currentTime / this.props.duration * 100 || 0}
                    {...this.props}
                />
                <Progress
                    className="player-progress"
                    value={this.props.currentTime / this.props.duration * 100 || 0}
                    {...this.props}
                />
            </div>
        );
    }
}

function mapStateToProps(state) { return {
    name: state.get('name'),
    current: state.get('current')
}}