import React from 'react';
import './YoutubeProgress.scss';

export class YoutubeProgressComponent extends React.Component {


    render() {
        const progressStyle = {
            width: this.props.progress + '%'
        };
        return (
            <div className="youtube-progress">
                <div className="progress-container">
                    <div className="progress-progress" style={progressStyle}>
                    </div>
                </div>
            </div>
        );
    }
}