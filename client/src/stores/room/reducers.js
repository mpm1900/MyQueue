import * as Actions from './actions';
import * as Core from './core';
import {toJS} from 'immutable';


export const reducer = (state = Core.INITIAL_STATE, action) => {
    switch(action.type) {
        case Actions.SET_STATE:
            return Core.setState(state, action.state);
        case Actions.PLAYER_PAUSE:
            return Core.setPlaying(state, false);
        case Actions.PLAYER_PLAY:
            return Core.setPlaying(state, true);
        case Actions.QUEUE_ENQUEUE:
            return Core.queueEnqueue(state, action.entry);
        case Actions.QUEUE_DEQUEUE:
            return Core.queueDequeue(state);
        case Actions.QUEUE_PROMOTE:
            return Core.queuePromote(state, action.entry);
        case Actions.QUEUE_DEMOTE:
            return Core.queueDemote(state, action.entry);
        case Actions.QUEUE_REMOVE:
            return Core.queueRemove(state, action.entry);
        case Actions.CHAT_ADD:
            return Core.chatAdd(state, action.chat);
        default:
            return state;
    }
};

export default (state, action) => {
    let room = reducer(state, action);
    //localStorage.setItem('room', JSON.stringify(room.toJS()));
    return room;
};