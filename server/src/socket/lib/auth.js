import {Client, Server} from '../events';

export const handleAuthResponse = (socket, sessions, users) => (event) => {
    console.log('Auth Response:', event);
    if (event.type == 'SESSION') {
        let session = sessions[event.sid];
        let user = users[event.uid];
        if (session && user && (session == event.uid)) {
            socket.uid = event.uid;
            socket.emit(...Server.authSuccess(user, event.sid));
        } else {
            socket.emit(...Server.authError('Authentication error.'));
        }
    } else if (event.type == 'LOGIN') {
        for (let uid in users) {
            if (users[uid].username == event.username) {
                if (users[uid].password == event.password) {
                    sessions[socket.id] = uid;
                    socket.uid = uid;
                    socket.emit(...Server.authSuccess(users[uid], socket.id));
                    return;
                } else {
                    socket.emit(...Server.authError('Authentication error.'));
                    return;
                }
            }
        }
        socket.emit(...Server.authError('User not found.'));
    } else if (event.type == 'NEW') {
        for (let uid in users) {
            if (users[uid].username == event.username) {
                socket.emit(...Server.authError('User already exists.'));
                return;
            }
        }

        let sid = socket.id;
        let user = {
            uid: socket.id,
            username: event.username,
            password: event.password
        };

        users[user.uid] = user;
        sessions[sid] = user.uid;
        socket.uid = user.uid;
        socket.emit(...Server.authSuccess(user, sid));
    }
};

export const handleAuthLogout = (socket, sessions) => (event) => {
    let uid = event.uid;
    let sid = event.sid;

    if (sessions[sid] == uid) {
        delete sessions[sid];
    }

    socket.emit(...Server.authLogout());
};
