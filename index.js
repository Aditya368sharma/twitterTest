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
//var stream = bot.stream('statuses/filter', { track: 'aditya_368' });
var stream = bot.stream('user');

stream.on('tweet', function (tweet) {
    console.log("tweet.text",tweet.text);
     replyTo(tweet, 'Greeting from Aditya!');
});

function replyTo(tweet, message) {
	var text = '@' + tweet.user.screen_name + ' ' + message;
	bot.post('statuses/update', { status: text, in_reply_to_status_id: tweet.user.id_str },
	    function(err, data, response) {
		console.log(data)
	    }
	);
}

////////////


stream.on('direct_message', function (eventMsg) {
var msg = eventMsg.direct_message.text;
var screenName = eventMsg.direct_message.sender.screen_name;
var userId = eventMsg.direct_message.sender.id;

// reply object
var replyTo = { user_id: userId,
  text: "Thanks for your message :)",
  screen_name: screenName };

console.log(screenName + " says: " + msg );

// avoid replying to yourself when the recipient is you
if(screenName != eventMsg.direct_message.recipient_screen_name){

  //post reply
  bot.post("direct_messages/new",replyTo, function(err,data,response){
          console.info(data);
      });
  }
});
}

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
}, 1700000);
sendTweet();

app.get('/', (req, res) => res.send('Hello World!'));



// Tells the Express app to listen to a port
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


function replyToDirectMessage(){

 //get the user stream
