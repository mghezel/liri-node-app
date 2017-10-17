var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var credentials = require("./key.js");


var action = process.argv[2];
var value = process.argv[3];  
//'mona18909518'

switch (action) {
  case "my-tweets":
    userTweets();
    break;

  case "spotify-this-song":
    spotifyThisSong();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    readRandom();
    break;
}

function userTweets(){

     var client = new Twitter({
      consumer_key: credentials.twitterKeys.consumer_key,
      consumer_secret: credentials.twitterKeys.consumer_secret,
      access_token_key: credentials.twitterKeys.access_token_key,
      access_token_secret: credentials.twitterKeys.access_token_secret
    });

   

    var params = {screen_name: value, count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (var i=0; i < params.count; i++){
        console.log(tweets[i].text);
        }
      }
    });
}


function spotifyThisSong(){

    var spotify = new Spotify({
      id: credentials.spotifyKeys.id,
      secret: credentials.spotifyKeys.secret
    });

    //Listen  Hola  Sorry Formation
    var limit = 5;

    if (value == null){
      value = 'Ace of Base';
    }
     
    spotify.search({ type: 'track', query: value, limit: 5 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    //console.log(items.album);
    for (var i=0; i<limit; i++){ 
      
      console.log("Song Name:");     
      console.log(data.tracks.items[i].name);
      console.log("Artist Name:");
      console.log(JSON.stringify(data.tracks.items[i].artists[i].name));
      console.log("Album");
      console.log(JSON.stringify(data.tracks.items[i].album.name));
      console.log("Preview Link");
      console.log(data.tracks.items[i].preview_url);
      
    }
  });
}

function movie(){

 // " + value + "
 if ( value == null){
   value = 'Mr.Nobody'
 }

  request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    // Then we print out the imdbRating
    //console.log(JSON.parse(body));
    
    console.log("Title of the movie: " + JSON.parse(body).Title);
    console.log("Year of the movie: " + JSON.parse(body).Released);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[0].Value);
    console.log("Country of the production: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);  
    
    }
  });
}

function readRandom(){

  fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  var dataArr = data.split(",");

  console.log(dataArr[0] +" "+ dataArr[1]);

  /// the switch case can be replaced by calling readRandom
  // create two global vars ouside of this function then assign the followings
  // action = dataArr[0];
  // value = dataArr[1];
  // then call each functions depends on what we have inside random.txt

 });

}



 
  