const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);

let moviesArray = [];

async function readMovie(id) {
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
        const selection = {
            _id: new ObjectId(id)
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

readMovie("65a1142ffc65ea9e291aba54");