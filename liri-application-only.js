var request = require("request");
var twitter = require("./key.js");
//var key = process.env.TWITTER_CONSUMER_KEY;
var key = twitter.consumer_key;
var secret = twitter.consumer_secret;
var cat = key +":"+secret;
var credentials = new Buffer(cat).toString('base64');

var url = 'https://api.twitter.com/oauth2/token';

request({ url: url,
    method:'POST',
    headers: {
        "Authorization": "Basic " + credentials,
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: "grant_type=client_credentials"

}, function(err, resp, body) {

    console.dir(body); //the bearer token...

});

var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
var bearerToken = process.env.TWITTER_BEARER_TOKEN; //the bearer token obtained from the last script

request({ url: url,
    method:'GET',
    qs:{"screen_name":"mona18909518"},
    json:true,
    headers: {
        "Authorization": "Bearer " + bearerToken
    }

}, function(err, resp, body) {

    console.dir(body);

});












//request("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=mona18909518&count=2", function(error, response, body) {

 
  //if (!error && response.statusCode === 200) {
    
    //console.log("The movie's rating is: " + JSON.parse(body).text);
    
  //}
//});
