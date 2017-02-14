import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../../../stores/room/actions';
import Youtube from 'react-youtube';
import {Client, Server} from '../../../../socket/events';
import {Map, List, toJS, fromJS} from 'immutable';
import {YoutubeProgressComponent} from './youtube-progress/YoutubeProgress';

import './YoutubePlayer.scss';


@connect(mapStateToProps, Actions)
export class YoutubePlayerComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log('YoutubePlayer: constructor.');
        this.player = null;
        this.state = {
            playing: false,
            currentTime: 0,
            duration: 0
        };

        const socket = this.props.socket;
        socket.on(Server.ROOM_PLAY, (event) => {
            if (event.action.player == 'yt') {
                this.play(true);
            }
        });
        socket.on(Server.ROOM_PAUSE, (event) => {
            if (event.action.player == 'yt') {
                this.pause(true);
            }
        });
        socket.on(Server.ROOM_SEEK, (event) => {
            if (event.action.player == 'yt') {
                this.player.seekTo(event.action.time);
            }
        });


        setInterval(() => {
            if (this.player && this.state.playing) {
                const time = this.player.getCurrentTime();
                const progress = (time * 100 / this.state.duration) || 0;
                this.setState({
                    progress: progress,
                    seekValue: this.state.seekValue,
                    currentTime: time
                });
            }
        }, 1000)
    }

    setPlaying(playing) {
        console.log('YoutubePlayer: setPlaying.');

        if (this.player) {
            this.setState({
                duration: this.player.getDuration(),
                playing: playing
            })
        }
    }

    ready(event) {
        console.log('YoutubePlayer: ready.');
        this.player = event.target;
        console.log(this.player);
    }

    pause(auto) {
        console.log('YoutubePlayer: pause.');
        if (this.player) {
            this.player.pauseVideo();
            if (!auto) {
                this.props.playerPause(this.props.name, 'yt');
            }
        }
    }

    play(auto) {
        console.log('YoutubePlayer: play.');
        if (this.player) {
            this.player.playVideo();
            if (!auto) {
                this.props.playerPlay(this.props.name, 'yt');
            }
        }
    }

    changeState(event) {
        //console.log('YoutubePlayer: changeState.');
        //console.log(event);
    }

    formatTime(time) {
        // if time is less than 01:00
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time - minutes * 60);
        let formattedTime = '';
        if (minutes < 10) {
            formattedTime += '0' + minutes + ':'
        } else {
            formattedTime += minutes + ':'
        }
        if (seconds < 10) {
            formattedTime += '0' + seconds;
        } else {
            formattedTime += seconds;
        }

        return formattedTime;
    }

    end() {
        this.props.queueDequeueAuto(this.props.name);
    }

    seek(event) {
        console.log(event.target.value);
        if (this.player) {
            const duration = this.player.getDuration();
            console.log(duration);
            const time = (event.target.value / 100) * duration;
            console.log(time);
            this.player.seekTo(time);
            this.props.playerSeek(time, 'yt', this.props.name)
        }
    }

    render() {
        return (
            <div className="youtube-player">
                <div className="player-actions">
                    <a className="button" onClick={() => this.props.queueDequeue(this.props.name)}>
                        <i className="fa fa-step-forward"></i>
                    </a>
                    <a className="button" onClick={() => null}>
                        <i className="fa fa-volume-up"></i>
                    </a>
                </div>
                <div className="player-tn">
                    <div className="player-play-pause">
                        {this.state.playing ?
                            <a onClick={() => this.pause(false)}><i className="fa fa-pause"></i></a> :
                            <a onClick={() => this.play(false)}><i className="fa fa-play"></i></a>
                        }
                    </div>
                    <img src={this.props.current.get('thumbnail')}/>
                </div>
                <div className="player-info">
                    <h5><i className="fa fa-youtube"></i> {this.props.current.get('title') || ' No Track Playing...'}</h5>
                    <span>{this.formatTime(this.state.currentTime)} / {this.formatTime(this.state.duration)}</span>
                </div>
                <div className="youtube-seek">
                    <input className="youtube-seek-input" type="range" onMouseUp={(event) => this.seek(event)} />
                </div>
                <YoutubeProgressComponent progress={this.state.progress} />
                <div className="hide">
                    <Youtube
                        opts={{
                            playerVars: {
                                autoplay: 1
                            }
                        }}
                        videoId={this.props.current.get('trackId') || ''}
                        onReady={(event) => this.ready(event)}
                        onEnd={() => this.end()}
                        onPlay={() => this.setPlaying(true)}
                        onPause={() => this.setPlaying(false)}
                        onStateChange={(event) => this.changeState(event)}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) { return {
    name: state.get('name'),
    current: state.get('current')
}}