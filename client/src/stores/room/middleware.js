import {Client, Server} from '../../socket/events';
import * as Actions from './actions';

export default (socket) => (store) => (next) => (action) => {
    //console.log(action.type);
    if (action.remote) {
        socketReducer(socket, action);
    }
    return next(action);
}

const socketReducer = (socket, action) => {
    switch (action.type) {
        case Actions.QUEUE_ENQUEUE:
            socket.emit(...Client.roomEnqueue(action));
            break;
        case Actions.QUEUE_DEQUEUE:
            socket.emit(...Client.roomDequeue(action));
            break;
        case Actions.QUEUE_PROMOTE:
            socket.emit(...Client.roomPromote(action));
            break;
        case Actions.QUEUE_DEMOTE:
            socket.emit(...Client.roomDemote(action));
            break;
        case Actions.QUEUE_REMOVE:
            socket.emit(...Client.roomRemove(action));
            break;
        case Actions.PLAYER_PLAY:
            socket.emit(...Client.roomPlay(action));
            break;
        case Actions.PLAYER_PAUSE:
            socket.emit(...Client.roomPause(action));
            break;
        case Actions.CHAT_ADD:
            socket.emit(...Client.roomChat(action));
            break;
        case Actions.PLAYER_SEEK:
            socket.emit(...Client.roomSeek(action));
            break;
        default:
            //console.log('Middleware: unknown action.');
    }
};