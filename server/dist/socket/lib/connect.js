'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connect = undefined;

var _events = require('../events');

var _auth = require('./auth');

var _room = require('./room');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var users = {};
var sessions = {};
var rooms = {};
var store = null;

/**
 * @usage io.on(socketEvents.CONNECTION, socketEvents.connect(store, db));
 * @param (socket)
 *
 * Root handler for socket.io events.
 */
var connect = exports.connect = function connect(socket) {
    console.log(socket.id, 'connected.');

    // On connect, send an auth request for auto login from saved data
    socket.emit.apply(socket, _toConsumableArray(_events.Server.authRequest()));

    // handle authorization requests from the client
    socket.on(_events.Client.AUTH_RESPONSE, (0, _auth.handleAuthResponse)(socket, sessions, users));

    // handle logout event from the client
    socket.on(_events.Client.AUTH_LOGOUT, (0, _auth.handleAuthLogout)(socket, sessions));

    // handle room request from the client
    socket.on(_events.Client.ROOM_REQUEST, (0, _room.handleRoomRequest)(socket, rooms, users));

    // handle room store events from the client
    socket.on(_events.Client.ROOM_ENQUEUE, (0, _room.handleRoomEnqueue)(socket, store, rooms));
    socket.on(_events.Client.ROOM_DEQUEUE, (0, _room.handleRoomDequeue)(socket, store, rooms));
    socket.on(_events.Client.ROOM_PROMOTE, (0, _room.handleRoomPromote)(socket, store, rooms));
    socket.on(_events.Client.ROOM_DEMOTE, (0, _room.handleRoomDemote)(socket, store, rooms));
    socket.on(_events.Client.ROOM_REMOVE, (0, _room.handleRoomRemove)(socket, store, rooms));
    socket.on(_events.Client.ROOM_PAUSE, (0, _room.handleRoomPause)(socket, store, rooms));
    socket.on(_events.Client.ROOM_PLAY, (0, _room.handleRoomPlay)(socket, store, rooms));
    socket.on(_events.Client.ROOM_CHAT, (0, _room.handleRoomChat)(socket, store, rooms));
    socket.on(_events.Client.ROOM_SEEK, (0, _room.handleRoomSeek)(socket, store, rooms));

    // handle client disconnect
    socket.on(_events.Client.DISCONNECT, handleDisconnect(socket, users, rooms));
};

var handleDisconnect = function handleDisconnect(socket, users, rooms) {
    return function () {
        console.log(socket.id, 'disconnected.');
        var user = users[socket.uid];
        if (user && user.room) {
            var oldRoom = rooms[user.room];
            if (oldRoom) {
                var _socket$broadcast$to;

                oldRoom.users.splice(oldRoom.users.indexOf(socket.uid), 1);
                if (oldRoom.users.length == 0) {
                    delete rooms[user.room];
                }

                user.room = null;
                var oldRoomUsers = {};
                for (var _uid in users) {
                    if (users[_uid].room == oldRoom.name) {
                        var roomUser = Object.assign({}, users[_uid]);
                        delete roomUser.password;
                        oldRoomUsers[_uid] = roomUser;
                    }
                }
                (_socket$broadcast$to = socket.broadcast.to(oldRoom.name)).emit.apply(_socket$broadcast$to, _toConsumableArray(_events.Server.roomUsersLeave(oldRoomUsers, oldRoom.users)));
            }
        }
    };
};