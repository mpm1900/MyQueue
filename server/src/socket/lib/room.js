import {Client, Server} from '../events';
import {List, Map, toJS, fromJS} from 'immutable';


function removeUserFromRoom(socket, user, rooms, users) {
    let oldRoom = rooms[user.room];
    oldRoom.users.splice(oldRoom.users.indexOf(user.uid), 1);
    if (oldRoom.users.length == 0) {
        delete rooms[user.room];
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
    socket.leave(oldRoom.name);
    socket.broadcast.to(oldRoom.name).emit(...Server.roomUsersLeave(oldRoomUsers, oldRoom.users));
}

function addUserToRoom(socket, user, room, users) {
    user.room = room.name;
    let roomUsers = {};
    for (let _uid in users) {
        if (users[_uid].room == room.name) {
            let roomUser = Object.assign({}, users[_uid]);
            delete roomUser.password;
            roomUsers[_uid] = (roomUser);
        }
    }
    socket.room = room.name;
    socket.join(socket.room);
    socket.broadcast.to(socket.room).emit(...Server.roomUsersJoin(roomUsers, room.users));
    return roomUsers;
}

export const handleRoomRequest = (socket, rooms, users) => (event) => {
    let uid = event.uid;
    let roomName = event.room;
    let room = rooms[roomName];
    let user = users[uid];

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
            let roomUsers = addUserToRoom(socket, user, room, users);
            socket.emit(...Server.roomSuccess('JOIN', room, roomUsers))
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
        let roomUsers = addUserToRoom(socket, user, room, users);
        socket.emit(...Server.roomSuccess('CREATE', room, roomUsers));
    }
    console.log('Room count', Object.keys(rooms).length);
};

export const handleRoomEnqueue = (socket, store, rooms) => (event) => {
    console.log('Room Enqueue:');
    event.action.remote = false;
    event.action.entry = fromJS(event.action.entry);
    socket.broadcast.to(socket.room).emit(...Server.roomEnqueue(event.action));
};

export const handleRoomDequeue = (socket, store, rooms) => (event) => {
    console.log('Room Dequeue:');
    event.action.remote = false;
    event.action.entry = fromJS(event.action.entry);
    socket.broadcast.to(socket.room).emit(...Server.roomEnqueue(event.action));
};

export const handleRoomPromote = (socket, store, rooms) => (event) => {
    console.log('Room Promote:');
    event.action.remote = false;
    event.action.entry = fromJS(event.action.entry);
    socket.broadcast.to(socket.room).emit(...Server.roomPromote(event.action));
};

export const handleRoomDemote = (socket, store, rooms) => (event) => {
    console.log('Room Demote:');
    event.action.remote = false;
    event.action.entry = fromJS(event.action.entry);
    socket.broadcast.to(socket.room).emit(...Server.roomDemote(event.action));
};

export const handleRoomRemove = (socket, store, rooms) => (event) => {
    console.log('Room Remove:');
    console.log(event.action.entry);
    event.action.remote = false;
    event.action.entry = fromJS(event.action.entry);
    socket.broadcast.to(socket.room).emit(...Server.roomRemove(event.action));
};

export const handleRoomPause = (socket, store, rooms) => (event) => {
    console.log('Room Pause:');
    console.log(event);
    event.action.remote = false;
    socket.broadcast.to(socket.room).emit(...Server.roomPause(event.action));
};

export const handleRoomPlay = (socket, store, rooms) => (event) => {
    console.log('Room Play:');
    console.log(event);
    event.action.remote = false;
    socket.broadcast.to(socket.room).emit(...Server.roomPlay(event.action));
};

export const handleRoomChat = (socket, store, rooms) => (event) => {
    console.log('Room Chat:');
    console.log(event.action.chat);
    event.action.remote = false;
    socket.broadcast.to(socket.room).emit(...Server.roomChat(event.action));
};

export const handleRoomSeek = (socket, store, rooms) => (event) => {
    console.log('Room Seek:');
    console.log(event);
    event.action.remote = false;
    socket.broadcast.to(socket.room).emit(...Server.roomSeek(event.action));
};