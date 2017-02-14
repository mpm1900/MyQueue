import {Client, Server} from '../events';
import {handleAuthResponse, handleAuthLogout} from './auth';
import {
    handleRoomRequest,
    handleRoomEnqueue,
    handleRoomDequeue,
    handleRoomPromote,
    handleRoomDemote,
    handleRoomRemove,
    handleRoomPause,
    handleRoomPlay,
    handleRoomChat,
    handleRoomSeek
} from './room';

let users = {};
let sessions = {};
let rooms = {};
let store = null;


/**
 * @usage io.on(socketEvents.CONNECTION, socketEvents.connect(store, db));
 * @param (socket)
 *
 * Root handler for socket.io events.
 */
export const connect = (socket) => {
    console.log(socket.id, 'connected.');

    // On connect, send an auth request for auto login from saved data
    socket.emit(...Server.authRequest());

    // handle authorization requests from the client
    socket.on(Client.AUTH_RESPONSE, handleAuthResponse(socket, sessions, users));

    // handle logout event from the client
    socket.on(Client.AUTH_LOGOUT, handleAuthLogout(socket, sessions));

    // handle room request from the client
    socket.on(Client.ROOM_REQUEST, handleRoomRequest(socket, rooms, users));

    // handle room store events from the client
    socket.on(Client.ROOM_ENQUEUE, handleRoomEnqueue(socket, store, rooms));
    socket.on(Client.ROOM_DEQUEUE, handleRoomDequeue(socket, store, rooms));
    socket.on(Client.ROOM_PROMOTE, handleRoomPromote(socket, store, rooms));
    socket.on(Client.ROOM_DEMOTE, handleRoomDemote(socket, store, rooms));
    socket.on(Client.ROOM_REMOVE, handleRoomRemove(socket, store, rooms));
    socket.on(Client.ROOM_PAUSE, handleRoomPause(socket, store, rooms));
    socket.on(Client.ROOM_PLAY, handleRoomPlay(socket, store, rooms));
    socket.on(Client.ROOM_CHAT, handleRoomChat(socket, store, rooms));
    socket.on(Client.ROOM_SEEK, handleRoomSeek(socket, store, rooms));

    // handle client disconnect
    socket.on(Client.DISCONNECT, handleDisconnect(socket, users, rooms));
};

const handleDisconnect = (socket, users, rooms) => () => {
    console.log(socket.id, 'disconnected.');
    let user = users[socket.uid];
    if (user && user.room) {
        let oldRoom = rooms[user.room];
        if (oldRoom) {
            oldRoom.users.splice(oldRoom.users.indexOf(socket.uid), 1);
            if (oldRoom.users.length == 0) {
                delete rooms[user.room]
            }

            user.room = null;
            let oldRoomUsers = {};
            for (let _uid in users) {
                if (users[_uid].room == oldRoom.name) {
                    let roomUser = Object.assign({}, users[_uid]);
                    delete roomUser.password;
                    oldRoomUsers[_uid] = (roomUser);
                }
            }
            socket.broadcast.to(oldRoom.name).emit(...Server.roomUsersLeave(oldRoomUsers, oldRoom.users));
        }
    }
};