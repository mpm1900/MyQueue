'use strict';

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _connect = require('./socket/lib/connect');

var _events = require('./socket/events');

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _youtubeSearchApi = require('youtube-search-api');

var _youtubeSearchApi2 = _interopRequireDefault(_youtubeSearchApi);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var io = new _socket2.default().attach(3005);
console.log(io);
var API_KEY = 'AIzaSyBYf1d1OI9RrbBZ8ox-HppCUqyndH8herc';

io.on(_events.Client.CONNECT, _connect.connect);

var client = new _twitter2.default({
    consumer_key: '4csTpkpc5USVVDu5PiKaIGFmE',
    consumer_secret: 'MjvnvGfj5LxIvtA14RXzgl3MCBwJEvVYVfIpX2L4RkB24G6MZO',
    access_token_key: '2677944852-3cBCfh7LqvjX4y8N3pNB5rzOeclOXugbmkKudtn',
    access_token_secret: '4acdBXipQvmYKI61FPJwQqTl8u5MGO5KE1cRLk4IpBZDC'
});

client.stream('statuses/filter', { track: '#MyQAdd' }, function (stream) {
    console.log(stream);
    stream.on('data', function (tweet) {
        var params = tweet.text.split(' ');
        if (params[1] && params[2]) {
            var query = '';
            for (var i = 2; i < params.length; i++) {
                query += params[i] + '';
            }
            io.to(params[1]).emit('TWITTER', {
                query: query,
                room: params[1]
            });
            console.log(params);
        }
    });

    stream.on('error', function (error) {
        console.log(error);
    });
});