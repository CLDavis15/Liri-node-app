require("dotenv").config();


// Variables

var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var keys = require("./keys.js");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var bandsInTown = (keys.bandsInTown);

var liriInput = process.argv[2];
var userInput = process.argv.slice(3).join(" ");


// Logic
function userCommand(liriInput, userInput){
    switch (liriInput){
        case "concert-this":
            concertThis();
            break;
        case "spotify-this":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doWhat(userInput);
            break;
        default:
            console.log("What is going on?");
            break;
    }
}

userCommand(liriInput, userInput);

function concertThis(){
    console.log(`Searching for ${userInput}'s show..`);

    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id="
     + bandsInTown)
     .then(function(response){

            if (response.data.length <= 0) {
                console.log("Band or concert not found!");
            
            }
            else{
                for (var i = 0; i < response.data.length; i++){

                    console.log(`Artist: ${response.data[i].lineup[0]} 
                    Venue: ${response.data[i].venue.name} 
                    Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}`);
                    
                    var concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log(`Date and Time: ${concertDate}---`);
                };
           
            };
    });
};


function spotifyThisSong(){
    if(!userInput){
        userInput = "The Sign";
    }
    console.log(`spotify this song: ${userInput}`);
    spotify.search({
        type: "track",
        query: userInput
    }, function (err, data){
        if(err){
            console.log("Error occured: " + err);
            return;
        }
        var music = data.tracks.items;

            console.log(`
            Artist: ${music[0].artists[0].name}
            Song: ${music[0].name}
            Album: ${music[0].album.name}
            Spotify Link: ${music[0].external_urls.spotify}
            ------`)
       
    });
};

function movieThis(){
    
    if (!userInput){
        userInput = "Mr Nobdy";
    }

    axios.get("http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy")
    .then(function(response){
        
            console.log(`Searching for ${userInput}..`);
            console.log(`Title: ${response.data.Title}
            Released Date: ${response.data.Year}
            IMDB Rating: ${response.data.imdbRating}
            Rotten Tomatoes: ${response.data.Ratings[1].Value}
            Country: ${response.data.Country}
            Language: ${response.data.Language}
            Plot: ${response.data.Plot}
            Cast: ${response.data.Actors}`)
        
           
        });
};

function doWhat(){
    fs.readFile("random.txt", "UTF8", function (err, data){
        if (err) {
            return console.log(err);
        };

        var dataArr = data.split(", ");

        liriInput = dataArr[0];
        userInput = dataArr[1];

        userCommand(liriInput, userInput);
    });
};