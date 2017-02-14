import SocketServer from 'socket.io';
import {connect} from './socket/lib/connect';
import {Client, Server} from './socket/events';
import Twitter from 'twitter';
import YTSearch from 'youtube-search-api';
import {List, Map, toJS, fromJS} from 'immutable';

const io = new SocketServer().attach(3005);
const API_KEY = 'AIzaSyBYf1d1OI9RrbBZ8ox-HppCUqyndH8herc';

io.on(Client.CONNECT, connect);



let client = new Twitter({
    consumer_key: '4csTpkpc5USVVDu5PiKaIGFmE',
    consumer_secret: 'MjvnvGfj5LxIvtA14RXzgl3MCBwJEvVYVfIpX2L4RkB24G6MZO',
    access_token_key: '2677944852-3cBCfh7LqvjX4y8N3pNB5rzOeclOXugbmkKudtn',
    access_token_secret: '4acdBXipQvmYKI61FPJwQqTl8u5MGO5KE1cRLk4IpBZDC'
});

client.stream('statuses/filter', {track: '#MyQAdd'}, function(stream) {
    console.log(stream);
    stream.on('data', function(tweet) {
        let params = (tweet.text).split(' ');
        if (params[1] && params[2]) {
            let query = '';
            for (let i = 2; i < params.length; i++) {
                query += (params[i] + '');
            }
            io.to(params[1]).emit('TWITTER', {
                query: query,
                room: params[1]
            });
            console.log(params);
        }
    });


    stream.on('error', function(error) {
        console.log(error);
    });

});