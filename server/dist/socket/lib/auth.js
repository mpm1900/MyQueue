'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleAuthLogout = exports.handleAuthResponse = undefined;

var _events = require('../events');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var handleAuthResponse = exports.handleAuthResponse = function handleAuthResponse(socket, sessions, users) {
    return function (event) {
        console.log('Auth Response:', event);
        if (event.type == 'SESSION') {
            var session = sessions[event.sid];
            var user = users[event.uid];
            if (session && user && session == event.uid) {
                socket.uid = event.uid;
                socket.emit.apply(socket, _toConsumableArray(_events.Server.authSuccess(user, event.sid)));
            } else {
                socket.emit.apply(socket, _toConsumableArray(_events.Server.authError('Authentication error.')));
            }
        } else if (event.type == 'LOGIN') {
            for (var uid in users) {
                if (users[uid].username == event.username) {
                    if (users[uid].password == event.password) {
                        sessions[socket.id] = uid;
                        socket.uid = uid;
                        socket.emit.apply(socket, _toConsumableArray(_events.Server.authSuccess(users[uid], socket.id)));
                        return;
                    } else {
                        socket.emit.apply(socket, _toConsumableArray(_events.Server.authError('Authentication error.')));
                        return;
                    }
                }
            }
            socket.emit.apply(socket, _toConsumableArray(_events.Server.authError('User not found.')));
        } else if (event.type == 'NEW') {
            for (var uid in users) {
                if (users[uid].username == event.username) {
                    socket.emit.apply(socket, _toConsumableArray(_events.Server.authError('User already exists.')));
                    return;
                }
            }

            var sid = socket.id;
            var user = {
                uid: socket.id,
                username: event.username,
                password: event.password
            };

            users[user.uid] = user;
            sessions[sid] = user.uid;
            socket.uid = user.uid;
            socket.emit.apply(socket, _toConsumableArray(_events.Server.authSuccess(user, sid)));
        }
    };
};

var handleAuthLogout = exports.handleAuthLogout = function handleAuthLogout(socket, sessions) {
    return function (event) {
        var uid = event.uid;
        var sid = event.sid;

        if (sessions[sid] == uid) {
            delete sessions[sid];
        }

        socket.emit.apply(socket, _toConsumableArray(_events.Server.authLogout()));
    };
};