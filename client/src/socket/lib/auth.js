import {Client, Server} from '../events';

export const handleAuthRequest = (socket, callback = () => null) => (event) => {
    console.log('auth request received.');
    let uid = sessionStorage.getItem('uid');
    let sid = sessionStorage.getItem('sid');

    if (uid && sid) {
        socket.emit(...Client.authResponse('SESSION', uid, sid));
    } else {
        callback();
    }
};

export const handleAuthSuccess = (socket, callback) => (event) => {
    console.log('successful authentication.');
    sessionStorage.setItem('uid', event.user.uid);
    sessionStorage.setItem('sid', event.sid);
    callback(event.user);
};

export const handleAuthError = (socket) => (event) => {
    console.log('unsuccessful authentication.');
    sessionStorage.removeItem('uid');
    sessionStorage.removeItem('sid');
    alert(event.error);
};