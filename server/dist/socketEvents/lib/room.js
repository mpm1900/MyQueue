'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleRoomRequest = undefined;

var _events = require('../events');

var handleRoomRequest = exports.handleRoomRequest = function handleRoomRequest(socket, rooms, users) {
    return function (event) {
        var uid = event.uid;
        var roomName = event.room;
        var room = rooms[roomName];

        if (room) {
            console.log(room);
            if (room.meta.locked) {} else {
                room.users.push(uid);
                var user = users[uid];
                if (user.room) {
                    var oldRoom = rooms[user.room];
                    oldRoom.users.splice(oldRoom.users.indexOf(uid), 1);
                    if (oldRoom.users.length == 0) {
                        delete rooms[user.room];
                    }
                }
                user.room = roomName;
                socket.emit(_events.Server.ROOM_SUCCESS, _events.Server.roomSuccess('JOIN', room));
            }
        } else {
            rooms[roomName] = {
                current: {},
                queue: [],
                users: [uid],
                admin: uid,
                chat: [],
                meta: {
                    name: roomName,
                    locked: false
                }
            };

            var user = users[uid];
            if (user.room) {
                var oldRoom = rooms[user.room];
                oldRoom.users.splice(oldRoom.users.indexOf(uid), 1);
                if (oldRoom.users.length == 0) {
                    delete rooms[user.room];
                }
            }
            user.room = roomName;
            socket.emit(_events.Server.ROOM_SUCCESS, _events.Server.roomSuccess('CREATE', rooms[roomName]));
        }
        console.log(rooms);
    };
};