 var express = require('express');
 var twit = require('twit');
 var request = require('request');
//
//var Twitter = require('twitter');

var clientAccessToken=process.env.clientAccessToken;

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
stream.on('direct_message', function (eventMsg) {
    console.log("EVENT MESSAGE >>",eventMsg);
    console.log("eventMsg.direct_message.sender.screen_name",eventMsg.direct_message.sender.screen_name);
    if (eventMsg.direct_message.sender.screen_name==="aditya_368"){
      console.log("should not call post method as msg coming from ",eventMsg.direct_message.sender.screen_name);
    } else {

      console.log("eventMsg.direct_message.text>>>",eventMsg.direct_message.text);
      var inputext =eventMsg.direct_message.text
      console.log("inputext",inputext);
// Set the headers
var headers = {
    'Authorization':       'Bearer '+ clientAccessToken,
    'Content-Type':     'application/json'
}

// Configure the request//https://api.dialogflow.com/v1/query?v=20150910&lang=en&query=hi&sessionId=12345
var options = {
    url: `https://api.dialogflow.com/v1/query?v=20150910&lang=en&query=${inputext}&sessionId=12345`,
    //url : 'https://api.dialogflow.com/v1/query?v=20150910&lang=en&query=hi&sessionId=12345',
    //path: '/v1/query?v=20150910&lang=en&query=' + inputext + '&sessionId=1',
    //method: 'GET',
    headers: headers,
    //qs: {'key1': 'xxx', 'key2': 'yyy'}
}

// Start the request
request.get(options, function (error, response, body) {
  console.log("options>>>",options);
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log("body>>",body)
        console.log("response>>",response);
        console.log("response_body",response.body);
        console.log("response_result>>>",response.body.result);
        console.log("response_fulfilment>>>",response.body.result.fulfillment);
        console.log("response_displayText>>>",response.body.result.fulfillment.displayText);
        console.log("should call post method");
        console.log("Sent Response >>",params);
        postMessage(params);
    } else {
      console.log("error>>",error);
    }
})
      // console.log("should call post method");
      // console.log("Sent Response >>",params);
      // //postMessage(params);
    }
  });

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
