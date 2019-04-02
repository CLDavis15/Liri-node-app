require("dotenv").config();


// Variables

var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var keys = require("./keys.js");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var omdb = (keys.ombd);
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
            doThis();
            break;
        default:
            console.log("What is going on?");
            break;
    }
}

userCommand(liriInput, userInput);

function concertThis(){
    
}


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
}