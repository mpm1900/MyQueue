import React from 'react';
import * as Actions from '../../../stores/room/actions';
import {connect} from 'react-redux';
import './RoomQueue.scss';

const _RoomQueueComponent = (props) => (
    <div className="room-queue">
        <ul className="room-queue-list">
            {props.queue.isEmpty() ?
                <li className="queue-entry">
                    <div className="queue-entry-info center">
                        <h5>The queue is empty...</h5>
                    </div>
                </li>:
                null
            }
            {props.queue.map(entry => (
                <li key={entry.get('trackId')} className="queue-entry">
                    <div className="queue-entry-actions">
                        <a onClick={() => props.queuePromote(entry, props.name)}><i className="fa fa-chevron-up"></i></a>
                        <a onClick={() => props.queueRemove(entry, props.name)}><i className="fa fa-trash"></i></a>
                        <a onClick={() => props.queueDemote(entry, props.name)}><i className="fa fa-chevron-down"></i></a>
                    </div>
                    <div className="queue-entry-tn">
                        <img src={entry.get('thumbnail')} />
                    </div>
                    <div className="queue-entry-info">
                        <h5>{entry.get('title')}</h5>
                        <p className="queue-entry-addedBy">Added by {entry.get('addedBy')}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

function mapStateToProps(state) { return {
    name: state.get('name'),
    queue: state.get('queue')
}}

export const RoomQueueComponent = connect(mapStateToProps, Actions)(_RoomQueueComponent);
