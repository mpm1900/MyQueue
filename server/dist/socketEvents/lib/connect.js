'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connect = undefined;

var _events = require('../events');

var _auth = require('./auth');

var _room = require('./room');

var users = {};
var sessions = {};
var rooms = {};

/**
 * @usage io.on(socketEvents.CONNECTION, socketEvents.connect);
 * @param socket
 *
 * Root handler for socket.io events.
 */
var connect = exports.connect = function connect(socket) {
    console.log(socket.id, 'connected');

    // On connect, send an auth request for auto login from saved data
    socket.emit(_events.Server.AUTH_REQUEST, _events.Server.authRequest());

    // handle authorization requests from the client
    socket.on(_events.Client.AUTH_RESPONSE, (0, _auth.handleAuthResponse)(socket, sessions, users));

    // handle logout event from the client
    socket.on(_events.Client.AUTH_LOGOUT, (0, _auth.handleAuthLogout)(socket, sessions));

    // handle room request from the client
    socket.on(_events.Client.ROOM_REQUEST, (0, _room.handleRoomRequest)(socket, rooms, users));

    // handle client disconnect
    socket.on(_events.Client.DISCONNECT, handleDisconnect(socket, users, rooms));
};

var handleDisconnect = function handleDisconnect(socket, users, rooms) {
    return function () {
        console.log(socket.id, 'DISCONNECT');
        var user = users[socket.uid];
        if (user && user.room) {
            var oldRoom = rooms[user.room];
            if (oldRoom) {
                oldRoom.users.splice(oldRoom.users.indexOf(socket.uid), 1);
                if (oldRoom.users.length == 0) {
                    delete rooms[user.room];
                }

                user.room = null;
            }
        }
    };
};