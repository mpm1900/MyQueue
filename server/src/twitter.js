import Twitter from 'twitter';


let client = new Twitter({
    consumer_key: '4csTpkpc5USVVDu5PiKaIGFmE',
    consumer_secret: 'MjvnvGfj5LxIvtA14RXzgl3MCBwJEvVYVfIpX2L4RkB24G6MZO',
    access_token: '2677944852-3cBCfh7LqvjX4y8N3pNB5rzOeclOXugbmkKudtn',
    access_secret: '4acdBXipQvmYKI61FPJwQqTl8u5MGO5KE1cRLk4IpBZDC'
});

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
        console.log(tweets);
    }
});