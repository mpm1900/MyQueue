import {List, Map, toJS, fromJS} from 'immutable';

/**
 *  room: Map({
 *      name: (string),
 *      current: Map({
 *          title: (string),
 *          thumbnail: (string),
 *          trackId: (string),
 *          addedBy: (string)
 *      }),
 *      queue: List([
 *          Map({
 *              title: (string),
 *              thumbnail: (string),
 *              trackId: (string),
 *              addedBy: (string)
 *          })
 *      ]),
 *      users: Map({
 *          (string): Map({
 *              username: (string),
 *          })
 *      }),
 *      chat: List([
 *          Map({
 *              message: (string),
 *              username: (string)
 *          })
 *      ]),
 *      meta: Map({
 *          locked: (boolean),
 *          playing: (boolean),
 *          password: (string)
 *      })
 *  })
 */
export const INITIAL_STATE = Map({
    name: '',
    current: Map(),
    queue: List(),
    users: Map(),
    chat: Map({
        messages: List()
    })
});
const State = {
    CURRENT: 'current',
    QUEUE: 'queue',
    USERS: 'users',
    CHAT: 'chat',
    META: 'meta'
};

export const setState = (state, newState) => (
    state.merge(newState)
);

export const setPlaying = (state, playing) => (
    state.setIn([State.META, 'playing'], playing)
);

export const queueEnqueue = (state, entry) => {
    if (state.get(State.CURRENT, Map()).equals(Map())) {
        return state.merge({current: entry});
    } else {
        let queue = state.get(State.QUEUE, List());
        let queueArray = queue.toJS();
        for (let i = 0; i < queueArray.length; i++) {
            if (queueArray[i].trackId == entry.get('trackId')) {
                return queuePromote(state, entry);
            }
        }
        return state.merge({queue: queue.push(entry)});
    }
};

export const queueDequeue = (state) => {
    let queue = state.get(State.QUEUE, List());
    if (queue.size > 0) {
        return state.merge(Map({
            current: state.get(State.QUEUE).first(),
            queue: state.get(State.QUEUE).shift()
        }));
    } else {
        return state;
    }
};

export const queuePromote = (state, entry) => {
    let queueArray = state.get('queue', List()).toJS();
    for (let i = 0; i < queueArray.length; i++) {
        if (queueArray[i].trackId == entry.get('trackId') && i != 0) {
            [queueArray[i - 1], queueArray[i]] = [queueArray[i], queueArray[i - 1]];
            return state.merge({queue: fromJS(queueArray)});
        }
    }

    return state;
};

export const queueDemote = (state, entry) => {
    let queueArray = state.get('queue', List()).toJS();
    for (let i = 0; i < queueArray.length; i++) {
        if (queueArray[i].trackId == entry.get('trackId') && i != (queueArray.length - 1)) {
            [queueArray[i + 1], queueArray[i]] = [queueArray[i], queueArray[i + 1]];
            return state.merge({queue: fromJS(queueArray)});
        }
    }

    return state;
};

export const queueRemove = (state, entry) => {
    let queue = state.get('queue', List()).filter(_entry => _entry.get('trackId') != entry.get('trackId'));
    return state.merge({queue: queue});
};

export const usersJoin = (state, user) => null;
export const usersLeave = (state, user) => null;
export const chatAdd = (state, chat) => {
    let c = state.get('chat', Map({
        messages: List()
    }));
    let messages = c.get('messages', List()).push(chat);
    c = c.merge(Map({
        messages: messages
    }));

    return state.merge({
        chat: c
    });

};