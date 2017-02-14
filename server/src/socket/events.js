const SERVER_AUTH_REQUEST = 'SERVER:AUTH_REQUEST';
const SERVER_AUTH_SUCCESS = 'SERVER:AUTH_SUCCESS';
const SERVER_AUTH_ERROR = 'SERVER:AUTH_ERROR';
const SERVER_AUTH_LOGOUT = 'SERVER:AUTH_LOGOUT';
const SERVER_ROOM_SUCCESS = 'SERVER:ROOM_SUCCESS';
const SERVER_ROOM_ERROR = 'SERVER:ROOM_ERROR';
const SERVER_ROOM_USERS_JOIN = 'SERVER:ROOM_USERS_JOIN';
const SERVER_ROOM_USERS_LEAVE = 'SERVER:ROOM_USERS_LEAVE';
const SERVER_ROOM_ENQUEUE = 'SERVER:ROOM_ENQUEUE';
const SERVER_ROOM_DEQUEUE = 'SERVER:ROOM_DEQUEUE';
const SERVER_ROOM_PROMOTE = 'SERVER:ROOM_PROMOTE';
const SERVER_ROOM_DEMOTE = 'SERVER:ROOM_DEMOTE';
const SERVER_ROOM_REMOVE = 'SERVER:ROOM_REMOVE';
const SERVER_ROOM_PAUSE = 'SERVER:ROOM_PAUSE';
const SERVER_ROOM_PLAY = 'SERVER:ROOM_PLAY';
const SERVER_ROOM_CHAT = 'SERVER:ROOM_CHAT';
const SERVER_ROOM_SEEK = 'SERVER:ROOM_SEEK';


const CLIENT_CONNECT = 'connect';
const CLIENT_AUTH_RESPONSE = 'CLIENT:AUTH_RESPONSE';
const CLIENT_AUTH_LOGOUT = 'CLIENT:AUTH_LOGOUT';
const CLIENT_ROOM_REQUEST = 'CLIENT:ROOM_REQUEST';
const CLIENT_GET_ROOMS = 'CLIENT:GET_ROOMS';
const CLIENT_DISCONNECT = 'disconnect';

const CLIENT_ROOM_ENQUEUE = 'CLIENT:ROOM_ENQUEUE';
const CLIENT_ROOM_DEQUEUE = 'CLIENT:ROOM_DEQUEUE';
const CLIENT_ROOM_PROMOTE = 'CLIENT:ROOM_PROMOTE';
const CLIENT_ROOM_DEMOTE = 'CLIENT:ROOM_DEMOTE';
const CLIENT_ROOM_REMOVE = 'CLIENT:ROOM_REMOVE';
const CLIENT_ROOM_PAUSE = 'CLIENT:ROOM_PAUSE';
const CLIENT_ROOM_PLAY = 'CLIENT:ROOM_PLAY';
const CLIENT_ROOM_CHAT = 'CLIENT:ROOM_CHAT';
const CLIENT_ROOM_SEEK = 'CLIENT:ROOM_SEEK';


export class Server {
    static get AUTH_REQUEST() { return SERVER_AUTH_REQUEST }
    static get AUTH_SUCCESS() { return SERVER_AUTH_SUCCESS }
    static get AUTH_ERROR() { return SERVER_AUTH_ERROR }
    static get AUTH_LOGOUT() { return SERVER_AUTH_LOGOUT }
    static get ROOM_SUCCESS() { return SERVER_ROOM_SUCCESS }
    static get ROOM_ERROR() { return SERVER_ROOM_ERROR }
    static get ROOM_USERS_JOIN() { return SERVER_ROOM_USERS_JOIN }
    static get ROOM_USERS_LEAVE() { return SERVER_ROOM_USERS_LEAVE }
    static get ROOM_ENQUEUE() { return SERVER_ROOM_ENQUEUE }
    static get ROOM_DEQUEUE() { return SERVER_ROOM_DEQUEUE }
    static get ROOM_PROMOTE() { return SERVER_ROOM_PROMOTE }
    static get ROOM_DEMOTE() { return SERVER_ROOM_DEMOTE }
    static get ROOM_REMOVE() { return SERVER_ROOM_REMOVE }
    static get ROOM_PAUSE() { return SERVER_ROOM_PAUSE }
    static get ROOM_PLAY() { return SERVER_ROOM_PLAY }
    static get ROOM_CHAT() { return SERVER_ROOM_CHAT }
    static get ROOM_SEEK() { return SERVER_ROOM_SEEK }

    static authRequest() {
        return [this.AUTH_REQUEST, null];
    }

    static authLogout() {
        return [this.AUTH_LOGOUT, null];
    }

    static authSuccess(user, sessionID) {
        console.log('Authorization successful:', user.username);
        return [this.AUTH_SUCCESS, {
            user: user,
            sid: sessionID
        }]
    }

    static authError(error) {
        console.log('Authorization failed:', error);
        return [this.AUTH_ERROR, {
            error: error
        }]
    }

    static roomSuccess(type, room, users) {
        return [this.ROOM_SUCCESS, {
            type: type,
            room: room,
            users: users
        }]
    }

    static roomError(error) {
        return [this.ROOM_ERROR, {
            error: error
        }];
    }

    static roomUsersJoin(users, roomUsers) {
        return [this.ROOM_USERS_JOIN, {
            users: users,
            roomUsers: roomUsers
        }];
    }

    static roomUsersLeave(users, roomUsers) {
        return [this.ROOM_USERS_LEAVE, {
            users: users,
            roomUsers: roomUsers
        }];
    }

    static roomEnqueue(action) {
        return [this.ROOM_ENQUEUE, {
            action: action
        }];
    }

    static roomDequeue(action) {
        return [this.ROOM_DEQUEUE, {
            action: action
        }];
    }

    static roomPromote(action) {
        return [this.ROOM_PROMOTE, {
            action: action
        }];
    }

    static roomDemote(action) {
        return [this.ROOM_DEMOTE, {
            action: action
        }];
    }

    static roomRemove(action) {
        return [this.ROOM_REMOVE, {
            action: action
        }];
    }

    static roomPause(action) {
        return [this.ROOM_PAUSE, {
            action: action
        }];
    }

    static roomPlay(action) {
        return [this.ROOM_PLAY, {
            action: action
        }];
    }

    static roomChat(action) {
        return [this.ROOM_CHAT, {
            action: action
        }];
    }

    static roomSeek(action) {
        return [this.ROOM_SEEK, {
            action: action
        }];
    }
}


export class Client {
    static get CONNECT() { return CLIENT_CONNECT }
    static get AUTH_RESPONSE() { return CLIENT_AUTH_RESPONSE }
    static get AUTH_LOGOUT() { return CLIENT_AUTH_LOGOUT }
    static get ROOM_REQUEST() { return CLIENT_ROOM_REQUEST }
    static get DISCONNECT() { return CLIENT_DISCONNECT }
    static get GET_ROOMS() { return CLIENT_GET_ROOMS }

    static get ROOM_ENQUEUE() { return CLIENT_ROOM_ENQUEUE }
    static get ROOM_DEQUEUE() { return CLIENT_ROOM_DEQUEUE }
    static get ROOM_PROMOTE() { return CLIENT_ROOM_PROMOTE }
    static get ROOM_DEMOTE() { return CLIENT_ROOM_DEMOTE }
    static get ROOM_REMOVE() { return CLIENT_ROOM_REMOVE }
    static get ROOM_PAUSE() { return CLIENT_ROOM_PAUSE }
    static get ROOM_PLAY() { return CLIENT_ROOM_PLAY }
    static get ROOM_CHAT() { return CLIENT_ROOM_CHAT }
    static get ROOM_SEEK() { return CLIENT_ROOM_SEEK }
}