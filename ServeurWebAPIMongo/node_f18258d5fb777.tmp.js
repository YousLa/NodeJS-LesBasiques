let express = require('express');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);

let app = express();
app.use('/', express.static(__dirname + "/htdocs"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(8000);

app.get('/movies', function (request, response) {
    // aller dans la BD Mongo chercher la liste des films
    readMovies().then(function (moviesArray) {
        response.setHeader('Content-Type', 'application/json');
        response.status(200).send(moviesArray);
    });
});

app.get('/movies/:id', function (request, response) {
    // aller dans la BD Mongo chercher un film dont on a l'Id
    readMovie(request.params.id).then(function (movie) {
        response.setHeader('Content-Type', 'application/json');
        response.status(200).send(movie);
    });
});

app.delete('/movies/:id', function (request, response) {
    // aller dans la BD Mongo deleter un film dont on a l'Id
    deleteMovie(request.params.id).then(function () {
        response.status(204).send();
    });
});

app.post('/movies', function (request, response) {
    // aller créer un film dans la BD Mongo
    const newMovie = {
        Poster_Link: request.body.Poster_Link,
        Series_Title: request.body.Series_Title,
        Released_Year: request.body.Released_Year,
        Runtime: request.body.Runtime,
        Genre: request.body.Genre,
        IMDB_Rating: request.body.IMDB_Rating,
        Overview: request.body.Overview,
        Meta_score: request.body.Meta_score,
        Director: request.body.Director,
        Star1: request.body.Star1,
        Star2: request.body.Star2,
        Star3: request.body.Star3,
        Star4: request.body.Star4,
        No_of_Votes: request.body.No_of_Votes
    };
    createMovie(newMovie).then(function (createdMovie) {
        response.setHeader('Content-Type', 'application/json');
        response.status(201).send(createdMovie);
    });
});

app.put('/movies/:id', function (request, response) {
    const movieToUpdate = {
        Poster_Link: request.body.Poster_Link,
        Series_Title: request.body.Series_Title,
        Released_Year: request.body.Released_Year,
        Runtime: request.body.Runtime,
        Genre: request.body.Genre,
        IMDB_Rating: request.body.IMDB_Rating,
        Overview: request.body.Overview,
        Meta_score: request.body.Meta_score,
        Director: request.body.Director,
        Star1: request.body.Star1,
        Star2: request.body.Star2,
        Star3: request.body.Star3,
        Star4: request.body.Star4,
        No_of_Votes: request.body.No_of_Votes
    };
    updateMovie(request.params.id, movieToUpdate).then(function (updatedMovie) {
        response.setHeader('Content-Type', 'application/json');
        response.status(200).send(updatedMovie);
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
        return moviesArray;
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
        //console.log(movie.Series_Title);
        return movie;
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
        return result;
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await mongoClient.close();
    }
}

async function updateMovie(idMovieParameter, updatedMovie) {
    try {
        await mongoClient.connect();
        const moviesDatabase = mongoClient.db("movies");
        const imdbCollection = moviesDatabase.collection("imdb");
        const filter = { _id: new ObjectId(idMovieParameter) };
        // this option instructs the method to create a document
        // if no documents match the filter
        const options = { upsert: true };
        const updatedDocument = { $set: updatedMovie };
        const result = await imdbCollection.updateOne(filter, updatedDocument, options);
        return result;
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await mongoClient.close();
    }
}