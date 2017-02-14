import React from 'react';
import {connect} from 'react-redux';
import {Map, List, toJS, fromJS} from 'immutable';
import * as Actions from '../../../stores/room/actions';
import YTSearch from 'youtube-api-search';

import './RoomTrackSearch.scss';

const API_KEY = 'AIzaSyBYf1d1OI9RrbBZ8ox-HppCUqyndH8herc';
const clientId = '08f566caed2cb85af62673834eaef2d4';

@connect(mapStateToProps, Actions)
export class RoomTrackSearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            sc: true,
            yt: true,
            loading: false
        };
    }

    handleKeyUpAlt(event) {
        if (event.key == 'Enter') {
            this.setState({
                loading: true
            });
            let yt = [];
            let sc = [];
            let trackList = [];
            let length = 0;
            let query = event.target.value;
            const url = 'http://api.soundcloud.com/tracks.json?client_id=' + clientId;
            fetch(url + '&q=' + query)
                .then(res => res.json())
                .then(tracks => {
                    sc = tracks;
                    YTSearch({
                        key: API_KEY,
                        term: query,
                        maxResults: 25
                    }, (videos) => {
                        yt = videos;
                        console.log(sc);
                        console.log(yt);
                        if (yt.length > sc.length) {
                            length = yt.length;
                        } else {
                            length = sc.length;
                        }
                        console.log(length);
                        for (let i = 0; i < length; i++) {
                            if (this.state.sc && sc[i]) {
                                trackList.push({
                                    type: 'sc',
                                    title: sc[i].title,
                                    thumbnail: sc[i].artwork_url,
                                    trackId: sc[i].permalink_url,
                                    addedBy: this.props.user.username
                                });
                            }
                            if (this.state.yt && yt[i]) {
                                trackList.push({
                                    type: 'yt',
                                    title: yt[i].snippet.title,
                                    thumbnail: yt[i].snippet.thumbnails.default.url,
                                    trackId: yt[i].id.videoId,
                                    addedBy: this.props.user.username
                                });
                            }
                        }

                        this.setState({
                            videos: trackList,
                            loading: false
                        });
                    });
                });

            event.target.value = '';
        }
    }

    addTrack(track) {
        this.props.queueEnqueue(fromJS(track), this.props.name);
        let index = this.state.videos.indexOf(track);
        let videos = this.state.videos;
        videos.splice(index, 1);
        this.setState({
            videos: videos
        });
        this.props.chatAdd(Map({
            type: 'SYSTEM',
            message: this.props.user.username + ' added ' + track.title,
            user: 'SYSTEM'
        }), this.props.name);
    }

    setSC(event) {
        this.setState({
            sc: !this.state.sc
        });

        if (this.state.sc) {
            event.target.style.opacity = 0.3;
        } else {
            event.target.style.opacity = 1;
        }

        console.log(this.state.sc)
    }

    setYT(event) {
        this.setState({
            yt: !this.state.yt
        });

        if (this.state.yt) {
            event.target.style.opacity = 0.3;
        } else {
            event.target.style.opacity = 1;
        }

        console.log(this.state.yt);
    }

    render() {
        return (
            <div className="room-track-search">
                <div className="search-param" onClick={(event) => this.setSC(event)}>
                    <i className="fa fa-soundcloud"></i>
                </div>
                <div className="search-param" onClick={(event) => this.setYT(event)}>
                    <i className="fa fa-youtube"></i>
                </div>
                <input type="text" placeholder="Search for tracks" className="float-left search-input" onKeyUp={(event) => this.handleKeyUpAlt(event)} />
                {!this.state.loading ?
                    (this.state.videos.length > 0 ?
                        <ul className="search-results">
                            {this.state.videos.map(track => (
                                <li>
                                    <div className="track-add">
                                        <a onClick={() => this.addTrack(track)} className={track.type == 'sc' ? 'button sc' : 'button yt'}>
                                            <i className={track.type == 'sc' ? 'fa fa-soundcloud' : 'fa fa-youtube'}></i>
                                        </a>
                                    </div>
                                    <div className="track-tn">
                                        <img src={track.thumbnail}/>
                                    </div>
                                    <div className="track-info">
                                        <h5>{track.title}</h5>
                                    </div>
                                </li>
                            ))}
                        </ul>:
                        null
                    ):
                    <div className="loader">
                        <div className="spinner">
                            <div className="rect1"></div>
                            <div className="rect2"></div>
                            <div className="rect3"></div>
                            <div className="rect4"></div>
                            <div className="rect5"></div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) { return {
    name: state.get('name')
}}