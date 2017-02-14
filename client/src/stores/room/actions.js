/**
 * @Actions
 *      {string}
 */
export const SET_STATE      = 'SET_STATE';
export const PLAYER_PLAY    = 'PLAYER_PLAY';
export const PLAYER_PAUSE   = 'PLAYER_PAUSE';
export const PLAYER_SEEK    = 'PLAYER_SEEK';
export const QUEUE_ENQUEUE  = 'QUEUE_ENQUEUE';
export const QUEUE_DEQUEUE  = 'QUEUE_DEQUEUE';
export const QUEUE_PROMOTE  = 'QUEUE_PROMOTE';
export const QUEUE_DEMOTE   = 'QUEUE_DEMOTE';
export const QUEUE_REMOVE   = 'QUEUE_REMOVE';
export const USERS_JOIN     = 'USERS_JOIN';
export const USERS_LEAVE    = 'USERS_LEAVE';
export const CHAT_ADD       = 'CHAT_ADD';

/**
 *  @ActionCreators
 *      (params = null) => action
 */
export const setState = (state) => ({
    type: SET_STATE,
    state: state,
    remote: true
});

export const playerPlay = (room, player, trackId = null) => {
    const action = {
        type: PLAYER_PLAY,
        room: room,
        player: player,
        remote: true,
        trackId: trackId
    };
    return action;
};

export const playerPause = (room, player) => {
    const action ={
        type: PLAYER_PAUSE,
        room: room,
        player: player,
        remote: true
    };
    return action;
};

export const playerSeek = (time, player, room) => ({
    type: PLAYER_SEEK,
    time: time,
    player: player,
    room: room,
    remote: true
});

export const queueEnqueue = (entry, room) => ({
    type: QUEUE_ENQUEUE,
    entry: entry,
    room: room,
    remote: true
});

export const queueEnqueueAuto = (entry, room) => ({
    type: QUEUE_ENQUEUE,
    entry: entry,
    room: room,
    remote: false
});

export const queueDequeue = (room) => ({
    type: QUEUE_DEQUEUE,
    room: room,
    remote: true
});

export const queueDequeueAuto = (room) => ({
    type: QUEUE_DEQUEUE,
    room: room,
    remote: false
});

export const queuePromote = (entry, room) => ({
    type: QUEUE_PROMOTE,
    entry: entry,
    room: room,
    remote: true
});

export const queueDemote = (entry, room) => ({
    type: QUEUE_DEMOTE,
    entry: entry,
    room: room,
    remote: true
});

export const queueRemove = (entry, room) => ({
    type: QUEUE_REMOVE,
    entry: entry,
    room: room,
    remote: true
});

export const usersJoin = (user, room) => ({
    type: USERS_JOIN,
    user: user,
    room: room,
    remote: true
});

export const usersLeave = (user, room) => ({
    type: USERS_LEAVE,
    user: user,
    room: room,
    remote: true
});

export const chatAdd = (chat, room) => ({
    type: CHAT_ADD,
    chat: chat,
    room: room,
    remote: true
});

export const chatAddAuto = (chat, room) => ({
    type: CHAT_ADD,
    chat: chat,
    room: room,
    remote: false
});