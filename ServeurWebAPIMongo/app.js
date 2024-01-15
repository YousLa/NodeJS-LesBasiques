let express = require('express');
const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);

let app = express();
app.use('/', express.static(__dirname+"/htdocs"));
app.listen(8000);

let moviesArray = [];
let movie;

app.get('/movies', function(req, res) {
    // aller dans la BD Mongo chercher la liste des films
    readMovies().then( function() {
        res.setHeader('Content-Type', 'application/json');
        res.send(moviesArray);
    });
 });

 app.get('/movies/:id', function(req, res) {
    // aller dans la BD Mongo chercher un film dont on a l'Id
    readMovie(req.params.id).then( function() {
        res.setHeader('Content-Type', 'application/json');
        res.send(movie);
    });
 });

 async function readMovies() {
    try {
       await mongoClient.connect();
       // console.log("You successfully connected to DB");
       const moviesDatabase = mongoClient.db("movies");
       const imdbCollection = moviesDatabase.collection("imdb");
       const options = { 
           projection: { 
               Series_Title:1,
               Released_Year:1
            }
           };
       const selection = { };
       moviesArray = await imdbCollection.find(selection, options).toArray();
       for(let i=0 ; i<moviesArray.length ; i++) {
           console.log(moviesArray[i].Series_Title);
           }
       }
    catch (error) {
       console.error(error);
       }
    finally { 
       await mongoClient.close(); 
       }
}

async function readMovie(idMovieParameter) {
    try {
       await mongoClient.connect();
       const moviesDatabase = mongoClient.db("movies");
       const imdbCollection = moviesDatabase.collection("imdb");
       const options = { 
           projection: { 
               Series_Title:1,
               Released_Year:1
            }
           };
       const selection = { 
           _id: new ObjectId(idMovieParameter)
           };
       movie = await imdbCollection.findOne(selection, options);
           console.log(movie.Series_Title);
       }
    catch (error) {
       console.error(error);
       }
    finally { 
       await mongoClient.close(); 
       }
}