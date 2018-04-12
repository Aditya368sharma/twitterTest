var express = require('express');
var twit = require('twit');
var request = require('request');

var app = express();
app.set('port', process.env.PORT || 6000);

if(process.env.TWITTER_CONSUMER_KEY == undefined){
  require('./env.js');
}

var bot = new twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})
///////////////////////////////////
var stream = bot.stream('statuses/filter', { track: '@ditya_368' });

stream.on('tweet', function (tweet) {
    console.log(tweet.text);
});

function replyTo(tweet, message) {
	var text = '@' + tweet.user.screen_name + ' ' + message;
	T.post('statuses/update', { status: text, in_reply_to_status_id: tweet.user.id_str },
	    function(err, data, response) {
		console.log(data)
	    }
	);
}

////////////

// Callback chain
var sendTweet = function(){

      function nowReturnTweet(definition){
        var wordAndDef = "Hi"+ ": " + "adi";
        bot.post('statuses/update', { status: wordAndDef }, function(err, data, response) {
          console.log("Success!");
        });
      }
    }


// Send tweet every 28 minutes, and on start
setInterval(function() {
  sendTweet();
}, 1700);
sendTweet();

app.get('/', (req, res) => res.send('Hello World!'));



// Tells the Express app to listen to a port
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
