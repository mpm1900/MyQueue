'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SERVER_AUTH_REQUEST = 'SERVER:AUTH_REQUEST';
var SERVER_AUTH_SUCCESS = 'SERVER:AUTH_SUCCESS';
var SERVER_AUTH_ERROR = 'SERVER:AUTH_ERROR';
var SERVER_AUTH_LOGOUT = 'SERVER:AUTH_LOGOUT';
var SERVER_ROOM_SUCCESS = 'SERVER:ROOM_SUCCESS';
var SERVER_ROOM_ERROR = 'SERVER:ROOM_ERROR';
var SERVER_ROOM_USERS_JOIN = 'SERVER:ROOM_USERS_JOIN';
var SERVER_ROOM_USERS_LEAVE = 'SERVER:ROOM_USERS_LEAVE';
var SERVER_ROOM_ENQUEUE = 'SERVER:ROOM_ENQUEUE';
var SERVER_ROOM_DEQUEUE = 'SERVER:ROOM_DEQUEUE';
var SERVER_ROOM_PROMOTE = 'SERVER:ROOM_PROMOTE';
var SERVER_ROOM_DEMOTE = 'SERVER:ROOM_DEMOTE';
var SERVER_ROOM_REMOVE = 'SERVER:ROOM_REMOVE';
var SERVER_ROOM_PAUSE = 'SERVER:ROOM_PAUSE';
var SERVER_ROOM_PLAY = 'SERVER:ROOM_PLAY';
var SERVER_ROOM_CHAT = 'SERVER:ROOM_CHAT';
var SERVER_ROOM_SEEK = 'SERVER:ROOM_SEEK';

var CLIENT_CONNECT = 'connect';
var CLIENT_AUTH_RESPONSE = 'CLIENT:AUTH_RESPONSE';
var CLIENT_AUTH_LOGOUT = 'CLIENT:AUTH_LOGOUT';
var CLIENT_ROOM_REQUEST = 'CLIENT:ROOM_REQUEST';
var CLIENT_GET_ROOMS = 'CLIENT:GET_ROOMS';
var CLIENT_DISCONNECT = 'disconnect';

var CLIENT_ROOM_ENQUEUE = 'CLIENT:ROOM_ENQUEUE';
var CLIENT_ROOM_DEQUEUE = 'CLIENT:ROOM_DEQUEUE';
var CLIENT_ROOM_PROMOTE = 'CLIENT:ROOM_PROMOTE';
var CLIENT_ROOM_DEMOTE = 'CLIENT:ROOM_DEMOTE';
var CLIENT_ROOM_REMOVE = 'CLIENT:ROOM_REMOVE';
var CLIENT_ROOM_PAUSE = 'CLIENT:ROOM_PAUSE';
var CLIENT_ROOM_PLAY = 'CLIENT:ROOM_PLAY';
var CLIENT_ROOM_CHAT = 'CLIENT:ROOM_CHAT';
var CLIENT_ROOM_SEEK = 'CLIENT:ROOM_SEEK';

var Server = exports.Server = function () {
    function Server() {
        _classCallCheck(this, Server);
    }

    _createClass(Server, null, [{
        key: 'authRequest',
        value: function authRequest() {
            return [this.AUTH_REQUEST, null];
        }
    }, {
        key: 'authLogout',
        value: function authLogout() {
            return [this.AUTH_LOGOUT, null];
        }
    }, {
        key: 'authSuccess',
        value: function authSuccess(user, sessionID) {
            console.log('Authorization successful:', user.username);
            return [this.AUTH_SUCCESS, {
                user: user,
                sid: sessionID
            }];
        }
    }, {
        key: 'authError',
        value: function authError(error) {
            console.log('Authorization failed:', error);
            return [this.AUTH_ERROR, {
                error: error
            }];
        }
    }, {
        key: 'roomSuccess',
        value: function roomSuccess(type, room, users) {
            return [this.ROOM_SUCCESS, {
                type: type,
                room: room,
                users: users
            }];
        }
    }, {
        key: 'roomError',
        value: function roomError(error) {
            return [this.ROOM_ERROR, {
                error: error
            }];
        }
    }, {
        key: 'roomUsersJoin',
        value: function roomUsersJoin(users, roomUsers) {
            return [this.ROOM_USERS_JOIN, {
                users: users,
                roomUsers: roomUsers
            }];
        }
    }, {
        key: 'roomUsersLeave',
        value: function roomUsersLeave(users, roomUsers) {
            return [this.ROOM_USERS_LEAVE, {
                users: users,
                roomUsers: roomUsers
            }];
        }
    }, {
        key: 'roomEnqueue',
        value: function roomEnqueue(action) {
            return [this.ROOM_ENQUEUE, {
                action: action
            }];
        }
    }, {
        key: 'roomDequeue',
        value: function roomDequeue(action) {
            return [this.ROOM_DEQUEUE, {
                action: action
            }];
        }
    }, {
        key: 'roomPromote',
        value: function roomPromote(action) {
            return [this.ROOM_PROMOTE, {
                action: action
            }];
        }
    }, {
        key: 'roomDemote',
        value: function roomDemote(action) {
            return [this.ROOM_DEMOTE, {
                action: action
            }];
        }
    }, {
        key: 'roomRemove',
        value: function roomRemove(action) {
            return [this.ROOM_REMOVE, {
                action: action
            }];
        }
    }, {
        key: 'roomPause',
        value: function roomPause(action) {
            return [this.ROOM_PAUSE, {
                action: action
            }];
        }
    }, {
        key: 'roomPlay',
        value: function roomPlay(action) {
            return [this.ROOM_PLAY, {
                action: action
            }];
        }
    }, {
        key: 'roomChat',
        value: function roomChat(action) {
            return [this.ROOM_CHAT, {
                action: action
            }];
        }
    }, {
        key: 'roomSeek',
        value: function roomSeek(action) {
            return [this.ROOM_SEEK, {
                action: action
            }];
        }
    }, {
        key: 'AUTH_REQUEST',
        get: function get() {
            return SERVER_AUTH_REQUEST;
        }
    }, {
        key: 'AUTH_SUCCESS',
        get: function get() {
            return SERVER_AUTH_SUCCESS;
        }
    }, {
        key: 'AUTH_ERROR',
        get: function get() {
            return SERVER_AUTH_ERROR;
        }
    }, {
        key: 'AUTH_LOGOUT',
        get: function get() {
            return SERVER_AUTH_LOGOUT;
        }
    }, {
        key: 'ROOM_SUCCESS',
        get: function get() {
            return SERVER_ROOM_SUCCESS;
        }
    }, {
        key: 'ROOM_ERROR',
        get: function get() {
            return SERVER_ROOM_ERROR;
        }
    }, {
        key: 'ROOM_USERS_JOIN',
        get: function get() {
            return SERVER_ROOM_USERS_JOIN;
        }
    }, {
        key: 'ROOM_USERS_LEAVE',
        get: function get() {
            return SERVER_ROOM_USERS_LEAVE;
        }
    }, {
        key: 'ROOM_ENQUEUE',
        get: function get() {
            return SERVER_ROOM_ENQUEUE;
        }
    }, {
        key: 'ROOM_DEQUEUE',
        get: function get() {
            return SERVER_ROOM_DEQUEUE;
        }
    }, {
        key: 'ROOM_PROMOTE',
        get: function get() {
            return SERVER_ROOM_PROMOTE;
        }
    }, {
        key: 'ROOM_DEMOTE',
        get: function get() {
            return SERVER_ROOM_DEMOTE;
        }
    }, {
        key: 'ROOM_REMOVE',
        get: function get() {
            return SERVER_ROOM_REMOVE;
        }
    }, {
        key: 'ROOM_PAUSE',
        get: function get() {
            return SERVER_ROOM_PAUSE;
        }
    }, {
        key: 'ROOM_PLAY',
        get: function get() {
            return SERVER_ROOM_PLAY;
        }
    }, {
        key: 'ROOM_CHAT',
        get: function get() {
            return SERVER_ROOM_CHAT;
        }
    }, {
        key: 'ROOM_SEEK',
        get: function get() {
            return SERVER_ROOM_SEEK;
        }
    }]);

    return Server;
}();

var Client = exports.Client = function () {
    function Client() {
        _classCallCheck(this, Client);
    }

    _createClass(Client, null, [{
        key: 'CONNECT',
        get: function get() {
            return CLIENT_CONNECT;
        }
    }, {
        key: 'AUTH_RESPONSE',
        get: function get() {
            return CLIENT_AUTH_RESPONSE;
        }
    }, {
        key: 'AUTH_LOGOUT',
        get: function get() {
            return CLIENT_AUTH_LOGOUT;
        }
    }, {
        key: 'ROOM_REQUEST',
        get: function get() {
            return CLIENT_ROOM_REQUEST;
        }
    }, {
        key: 'DISCONNECT',
        get: function get() {
            return CLIENT_DISCONNECT;
        }
    }, {
        key: 'GET_ROOMS',
        get: function get() {
            return CLIENT_GET_ROOMS;
        }
    }, {
        key: 'ROOM_ENQUEUE',
        get: function get() {
            return CLIENT_ROOM_ENQUEUE;
        }
    }, {
        key: 'ROOM_DEQUEUE',
        get: function get() {
            return CLIENT_ROOM_DEQUEUE;
        }
    }, {
        key: 'ROOM_PROMOTE',
        get: function get() {
            return CLIENT_ROOM_PROMOTE;
        }
    }, {
        key: 'ROOM_DEMOTE',
        get: function get() {
            return CLIENT_ROOM_DEMOTE;
        }
    }, {
        key: 'ROOM_REMOVE',
        get: function get() {
            return CLIENT_ROOM_REMOVE;
        }
    }, {
        key: 'ROOM_PAUSE',
        get: function get() {
            return CLIENT_ROOM_PAUSE;
        }
    }, {
        key: 'ROOM_PLAY',
        get: function get() {
            return CLIENT_ROOM_PLAY;
        }
    }, {
        key: 'ROOM_CHAT',
        get: function get() {
            return CLIENT_ROOM_CHAT;
        }
    }, {
        key: 'ROOM_SEEK',
        get: function get() {
            return CLIENT_ROOM_SEEK;
        }
    }]);

    return Client;
}();