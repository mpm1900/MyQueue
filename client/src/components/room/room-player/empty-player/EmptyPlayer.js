import React from 'react';
import './EmptyPlayer.scss';

export const EmptyPlayerComponent = (props) => (
    <div className="empty-player">
        <div className="sc-play-pause">
            <a className="sc-pp-btn" />
        </div>
        <div className="player-info">
            <h5>No Track Selected.</h5>
            <span>00:00 / 00:00</span>
        </div>
        <div className="player-actions">
            <a className="button" onClick={() => null}><i className="fa fa-step-forward"></i></a>
            <a className="button" onClick={() => null}>
                <i className="fa fa-volume-off"></i>
            </a>
        </div>
    </div>
);