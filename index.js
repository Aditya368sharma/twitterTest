 var express = require('express');
 var twit = require('twit');
 var request = require('request');
//
//var Twitter = require('twitter');


var app = express();
app.set('port', process.env.PORT || 7000);
app.get('/', (req, res) => res.send('Hello World!'));

var bot = new twit({
    consumer_key:         process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
    access_token:         process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var params = {};
var count =0;
params = {
  screen_name: 'jensonjms',
  text: `Hello World!!! ${count++}`
};
var stream = bot.stream('user');
console.log("stream",stream);
stream.on('direct_message', function (eventMsg) {
    console.log("EVENT MESSAGE >>",eventMsg);
    if (eventMsg.direct_message.sender.screen_name="aditya_368"){
      console.log("should not call post method");
    } else {
      console.log("should call post method");
      
    }
    console.log("Sent Response >>",params);
  });
  //postMessage(params);
  // bot.post('direct_messages/new', params, function(error, message, response) {
  //   if (error){
  //     console.log(error);
  //     return (error);
  //   }
  //   else  {
  //     console.log(message);
  //     return (response);
  //   }
  //  });
  // return function() {
  //     if (!executed) {
  //         executed = true;
  //         // do something
  //     }
  // };



var postMessage = function(pm){
  console.log("postMessage start >>>>",pm);
  bot.post('direct_messages/new', pm, function(error, message, response) {
  if (error){
    console.log(error);
    return (error);
  }
  else  {
    console.log(message);
    return (response);
  }
 });
};
// postMessage(params);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// var app = express();
// app.set('port', process.env.PORT || 6000);
//
// if(process.env.TWITTER_CONSUMER_KEY == undefined){
//   require('./env.js');
// }
//
// var bot = new twit({
//   consumer_key:         process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
//   access_token:         process.env.TWITTER_ACCESS_TOKEN,
//   access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
//   timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
// })
// ///////////////////////////////////
// var stream = bot.stream('statuses/filter', { track: 'aditya_368' });
//
// stream.on('tweet', function (tweet) {
//     console.log("tweet.text",tweet.text);
//      replyTo(tweet, 'Greeting from Aditya!');
// });
//
// function replyTo(tweet, message) {
// 	var text = '@' + tweet.user.screen_name + ' ' + message;
// 	bot.post('statuses/update', { status: text, in_reply_to_status_id: tweet.user.id_str },
// 	    function(err, data, response) {
// 		console.log(data)
// 	    }
// 	);
// }
//
// ////////////
//
// // Callback chain
// var sendTweet = function(){
//
//       function nowReturnTweet(definition){
//         var wordAndDef = "Hi"+ ": " + "adi";
//         bot.post('statuses/update', { status: wordAndDef }, function(err, data, response) {
//           console.log("Success!");
//         });
//       }
//     }
//
//
// // Send tweet every 28 minutes, and on start
// setInterval(function() {
//   sendTweet();
// }, 1700000);
// sendTweet();
//
// app.get('/', (req, res) => res.send('Hello World!'));
//
//
//
// // Tells the Express app to listen to a port
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });
