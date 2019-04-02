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
     + bandsInTown, function(err, body){
        if(!err){
            var userBand = JSON.parse(body);

            if (userBand.length > 0){
                for(i = 0; i < 1; i++) {
                    console.log(`Artist: ${userBand[i].lineup[0]} 
                    Venue: ${userBand.[i].venue.name} 
                    Location: ${userBand[i].venue.latitude}, ${userBand[i].venue.longitude}
                    City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`);

                    var concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log(`Date and Time: ${concertDate}---`);
                };
            }
            else{
                console.log("Band or concert not found!");
            };
        };
    });
};


function spotifyThisSong(){
    if(userInput === undefined){
        userInput = `"The Sign" Ace of Base`
    }
    console.log(`spotify this song: ${userInput}`);
    spotify.search({
        type: "track",
        query: userInput,
        limit: 1,
    }, function (err, data){
        if(err){
            return console.log("Error occured: " + err);
        }
        var music = data.tracks.items[i];
        
        for(i=0; i < spotifyThisSong.length; i++){

            console.log(`
            Artist: ${music.album.artist[0].name}
            Song: ${music.name}
            Album: ${music.album.name}
            Spotify Link: ${music.external_urls.spotify}
            ------`)
        };
    });
};

function movieThis(){
    console.log(`Searching for ${userInput}..`);
    if (!userInput){
        userInput = "Mr Nobdy";
    };

    axios.get("http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy", function(err, response, body){
        var userMovie = JSON.parse(body);

        var ratingsArr = userMovie.Ratings;
        if (ratingsArr.length >2){

        };
        if (!err){
            console.log(`Title: ${userMovie}
            Released Date: ${userMovie.Year}
            IMDB Rating: ${userMovie.imdbRating}
            Rotten Tomatoes: ${userMovie.Ratings[1].Value}
            Country: ${userMovie.Country}
            Language: ${userMovie.Language}
            Plot: ${userMovie.Plot}
            Cast: ${userMovie.Actors}`)
        }
        else{
            return console.log("Movie was not able to be found. Error:" + err);
        };

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