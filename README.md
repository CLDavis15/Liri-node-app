# Liri-node-app

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI Commands Used:


concert-this
spotify-this
movie-this
do-this

Technologies used:
Node.js
Javascript

npm packages:
spotify - A simple to use API library for the Spotify REST API.
axios - Which is used to call the omdb and concert API's.
dotenv - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
How to Run LIRI-Bot

Step One: node liri spotify-this <song name here>.

This will show the following information about the song in your terminal/bash window:

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
If no song is provided then the program will default to "My Heart Will Go On" by Celine Dion

Step Two: node liri.js movie-this <movie name here>.

This will output the following information to your terminal/bash window:

Title of the movie.
Year the movie came out.
IMDB Rating of the movie.
Country where the movie was produced.
Language of the movie.
Plot of the movie.
Actors in the movie.
Rotten Tomatoes Rating.
Rotten Tomatoes URL.
If the user doesn't type a movie in, the program will output data for the movie 'Crazy, Stupid, Love.'

Step Three: node liri.js do-this

This will output the command placed in random.txt file
