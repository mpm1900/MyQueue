'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleRoomSeek = exports.handleRoomChat = exports.handleRoomPlay = exports.handleRoomPause = exports.handleRoomRemove = exports.handleRoomDemote = exports.handleRoomPromote = exports.handleRoomDequeue = exports.handleRoomEnqueue = exports.handleRoomRequest = undefined;

var _events = require('../events');

var _immutable = require('immutable');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function removeUserFromRoom(socket, user, rooms, users) {
    var _socket$broadcast$to;

    var oldRoom = rooms[user.room];
    oldRoom.users.splice(oldRoom.users.indexOf(user.uid), 1);
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
    socket.leave(oldRoom.name);
    (_socket$broadcast$to = socket.broadcast.to(oldRoom.name)).emit.apply(_socket$broadcast$to, _toConsumableArray(_events.Server.roomUsersLeave(oldRoomUsers, oldRoom.users)));
}

function addUserToRoom(socket, user, room, users) {
    var _socket$broadcast$to2;

    user.room = room.name;
    var roomUsers = {};
    for (var _uid in users) {
        if (users[_uid].room == room.name) {
            var roomUser = Object.assign({}, users[_uid]);
            delete roomUser.password;
            roomUsers[_uid] = roomUser;
        }
    }
    socket.room = room.name;
    socket.join(socket.room);
    (_socket$broadcast$to2 = socket.broadcast.to(socket.room)).emit.apply(_socket$broadcast$to2, _toConsumableArray(_events.Server.roomUsersJoin(roomUsers, room.users)));
    return roomUsers;
}

var handleRoomRequest = exports.handleRoomRequest = function handleRoomRequest(socket, rooms, users) {
    return function (event) {
        var uid = event.uid;
        var roomName = event.room;
        var room = rooms[roomName];
        var user = users[uid];

        if (room) {
            console.log('Room Request:', room.name, 'found');
            // TODO Check Room BlackList
            if (room.meta.locked) {
                console.log('Room Request:', room.name, ' is locked. Sending auth request to client:', socket.id);
                // TODO Send Room Auth Request
            } else {
                    room.users.push(uid);
                    if (user.room) {
                        removeUserFromRoom(socket, user, rooms, users);
                    }
                    var roomUsers = addUserToRoom(socket, user, room, users);
                    socket.emit.apply(socket, _toConsumableArray(_events.Server.roomSuccess('JOIN', room, roomUsers)));
                }
        } else {
            room = {
                name: roomName,
                current: {},
                queue: [],
                users: [uid],
                chat: {
                    messages: []
                },
                meta: {
                    admin: uid,
                    locked: false
                }
            };

            rooms[roomName] = room;
            console.log('Room Request: creating room:', room.name);
            if (user.room) {
                removeUserFromRoom(socket, user, rooms, users);
            }
            var roomUsers = addUserToRoom(socket, user, room, users);
            socket.emit.apply(socket, _toConsumableArray(_events.Server.roomSuccess('CREATE', room, roomUsers)));
        }
        console.log('Room count', Object.keys(rooms).length);
    };
};

var handleRoomEnqueue = exports.handleRoomEnqueue = function handleRoomEnqueue(socket, store, rooms) {
    return function (event) {
        var _socket$broadcast$to3;

        console.log('Room Enqueue:');
        event.action.remote = false;
        event.action.entry = (0, _immutable.fromJS)(event.action.entry);
        (_socket$broadcast$to3 = socket.broadcast.to(socket.room)).emit.apply(_socket$broadcast$to3, _toConsumableArray(_events.Server.roomEnqueue(event.action)));
    };
};

var handleRoomDequeue = exports.handleRoomDequeue = function handleRoomDequeue(socket, store, rooms) {
    return function (event) {
        var _socket$broadcast$to4;

        console.log('Room Dequeue:');
        event.action.remote = false;
        event.action.entry = (0, _immutable.fromJS)(event.action.entry);
        (_socket$broadcast$to4 = socket.broadcast.to(socket.room)).emit.apply(_socket$broadcast$to4, _toConsumableArray(_events.Server.roomEnqueue(event.action)));
    };
};

var handleRoomPromote = exports.handleRoomPromote = function handleRoomPromote(socket, store, rooms) {
    return function (event) {
        var _socket$broadcast$to5;

        console.log('Room Promote:');
        event.action.remote = false;
        event.action.entry = (0, _immutable.fromJS)(event.action.entry);
        (_socket$broadcast$to5 = socket.broadcast.to(socket.room)).emit.apply(_socket$broadcast$to5, _toConsumableArray(_events.Server.roomPromote(event.action)));
    };
};

var handleRoomDemote = exports.handleRoomDemote = function handleRoomDemote(socket, store, rooms) {
    return function (event) {
        var _socket$broadcast$to6;

        console.log('Room Demote:');
        event.action.remote = false;
        event.action.entry = (0, _immutable.fromJS)(event.action.entry);
        (_socket$broadcast$to6 = socket.broadcast.to(socket.room)).emit.apply(_socket$broadcast$to6, _toConsumableArray(_events.Server.roomDemote(event.action)));
    };
};

var handleRoomRemove = exports.handleRoomRemove = function handleRoomRemove(socket, store, rooms) {
    return function (event) {
        var _socket$broadcast$to7;

        console.log('Room Remove:');
        console.log(event.action.entry);
        event.action.remote = false;
        event.action.entry = (0, _immutable.fromJS)(event.action.entry);
        (_socket$broadcast$to7 = socket.broadcast.to(socket.room)).emit.apply(_socket$broadcast$to7, _toConsumableArray(_events.Server.roomRemove(event.action)));
    };
};

var handleRoomPause = exports.handleRoomPause = function handleRoomPause(socket, store, rooms) {
    return function (event) {
        var _socket$broadcast$to8;

        console.log('Room Pause:');
        console.log(event);
        event.action.remote = false;
        (_socket$broadcast$to8 = socket.broadcast.to(socket.room)).emit.apply(_socket$broadcast$to8, _toConsumableArray(_events.Server.roomPause(event.action)));
    };
};

var handleRoomPlay = exports.handleRoomPlay = function handleRoomPlay(socket, store, rooms) {
    return function (event) {
        var _socket$broadcast$to9;

        console.log('Room Play:');
        console.log(event);
        event.action.remote = false;
        (_socket$broadcast$to9 = socket.broadcast.to(socket.room)).emit.apply(_socket$broadcast$to9, _toConsumableArray(_events.Server.roomPlay(event.action)));
    };
};

var handleRoomChat = exports.handleRoomChat = function handleRoomChat(socket, store, rooms) {
    return function (event) {
        var _socket$broadcast$to10;

        console.log('Room Chat:');
        console.log(event.action.chat);
        event.action.remote = false;
        (_socket$broadcast$to10 = socket.broadcast.to(socket.room)).emit.apply(_socket$broadcast$to10, _toConsumableArray(_events.Server.roomChat(event.action)));
    };
};

var handleRoomSeek = exports.handleRoomSeek = function handleRoomSeek(socket, store, rooms) {
    return function (event) {
        var _socket$broadcast$to11;

        console.log('Room Seek:');
        console.log(event);
        event.action.remote = false;
        (_socket$broadcast$to11 = socket.broadcast.to(socket.room)).emit.apply(_socket$broadcast$to11, _toConsumableArray(_events.Server.roomSeek(event.action)));
    };
};