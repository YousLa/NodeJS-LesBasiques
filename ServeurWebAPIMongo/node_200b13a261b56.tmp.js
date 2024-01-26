let express = require('express');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);

let app = express();
app.use('/', express.static(__dirname + "/htdocs"));
app.use(express.json());
app.listen(8000);

let moviesArray = [];
let movie;

app.get('/movies', function (req, res) {
    // aller dans la BD Mongo chercher la liste des films
    readMovies().then(function () {
        res.setHeader('Content-Type', 'application/json');
        res.send(moviesArray);
    });
});

app.get('/movies/:id', function (req, res) {
    // aller dans la BD Mongo chercher un film dont on a l'Id
    readMovie(req.params.id).then(function () {
        res.setHeader('Content-Type', 'application/json');
        res.send(movie);
    });
});

app.delete('/movies/:id', function (req, res) {
    // aller dans la BD Mongo deleter un film dont on a l'Id
    deleteMovie(req.params.id).then(function () {
        res.status(204).send();
    });
});

app.post('/movies', function (req, res) {
    // aller créer un film dans la BD Mongo
    console.log(req.body.title);
    const newMovie = {
        Poster_Link: req.body.Poster_Link,
        Series_Title: req.body.Series_Title,
        Released_Year: req.body.Released_Year,
        Runtime: req.body.Runtime,
        Genre: req.body.Genre,
        IMDB_Rating: req.body.IMDB_Rating,
        Overview: req.body.Overview,
        Meta_score: req.body.Meta_score,
        Director: req.body.Director,
        Star1: req.body.Star1,
        Star2: req.body.Star2,
        Star3: req.body.Star3,
        Star4: req.body.Star4,
        No_of_Votes: req.body.No_of_Votes
    };
    createMovie(newMovie).then(function () {
        res.setHeader('Content-Type', 'application/json');
        res.send(newMovie);
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
            }
        };
        const selection = {};
        moviesArray = await imdbCollection.find(selection, options).toArray();
        for (let i = 0; i < moviesArray.length; i++) {
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
            projection: {}
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

async function deleteMovie(idMovieParameter) {
    try {
        await mongoClient.connect();
        const moviesDatabase = mongoClient.db("movies");
        const imdbCollection = moviesDatabase.collection("imdb");
        const query = {
            _id: new ObjectId(idMovieParameter)
        };
        const result = await imdbCollection.deleteOne(query);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await mongoClient.close();
    }
}

async function createMovie(newMovie) {
    try {
        await mongoClient.connect();
        const moviesDatabase = mongoClient.db("movies");
        const imdbCollection = moviesDatabase.collection("imdb");
        const result = await imdbCollection.insertOne(newMovie);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await mongoClient.close();
    }
}