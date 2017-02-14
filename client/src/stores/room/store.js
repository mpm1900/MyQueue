import {createStore, applyMiddleware} from 'redux';
import middleware from './middleware';
import reducer from './reducers';

export default function makeStore(socket) {
    return applyMiddleware(middleware(socket))(createStore)(reducer);
}