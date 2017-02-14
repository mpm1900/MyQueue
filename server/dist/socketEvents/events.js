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

var CLIENT_CONNECT = 'connect';
var CLIENT_AUTH_RESPONSE = 'CLIENT:AUTH_RESPONSE';
var CLIENT_AUTH_LOGOUT = 'CLIENT:AUTH_LOGOUT';
var CLIENT_ROOM_REQUEST = 'CLIENT:ROOM_REQUEST';
var CLIENT_DISCONNECT = 'disconnect';

var Server = exports.Server = function () {
    function Server() {
        _classCallCheck(this, Server);
    }

    _createClass(Server, null, [{
        key: 'authRequest',
        value: function authRequest() {
            return null;
        }
    }, {
        key: 'authLogout',
        value: function authLogout() {
            return null;
        }
    }, {
        key: 'authSuccess',
        value: function authSuccess(user, sessionID) {
            return {
                user: user,
                sid: sessionID
            };
        }
    }, {
        key: 'authError',
        value: function authError(error) {
            return {
                error: error
            };
        }
    }, {
        key: 'roomSuccess',
        value: function roomSuccess(type, room) {
            return {
                type: type,
                room: room
            };
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
    }]);

    return Client;
}();