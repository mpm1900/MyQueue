'use strict';

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _twitter2.default({
    consumer_key: '4csTpkpc5USVVDu5PiKaIGFmE',
    consumer_secret: 'MjvnvGfj5LxIvtA14RXzgl3MCBwJEvVYVfIpX2L4RkB24G6MZO',
    access_token: '2677944852-3cBCfh7LqvjX4y8N3pNB5rzOeclOXugbmkKudtn',
    access_secret: '4acdBXipQvmYKI61FPJwQqTl8u5MGO5KE1cRLk4IpBZDC'
});

var params = { screen_name: 'nodejs' };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
});