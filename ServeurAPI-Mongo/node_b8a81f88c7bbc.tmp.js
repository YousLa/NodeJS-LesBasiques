let express = require('express');
const MongoClient = require('mongodb').MongoClient;

let app = express();
const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);

let moviesArray = [];

app.listen(8080);
// http://localhost:8080/movies
app.get('/movies', function (req, res) {
    readMovies().then(function () {
        res.setHeader('Content-Type', 'application/json');
        res.send(moviesArray);
    }
    );

})

async function readMovies() {
    try {
        await mongoClient.connect();
        // console.log("You successfully connected to DB");
        const moviesDatabase = mongoClient.db("movies");
        const imdbCollection = moviesDatabase.collection("imdb");
        const options = {
            projection: {
                Series_Title: 1,
                Released_Year: 1
            }
        };
        const selection = {};
        moviesArray = await imdbCollection.find(selection, options).toArray();
        for (let i = 0; i < moviesArray.length; i++) {
            console.log(moviesArray[i]);
        }
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await mongoClient.close();
    }
}
