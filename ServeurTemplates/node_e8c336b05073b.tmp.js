// ! Programmer app.js (Node) qui fait serveur de templates (ejs) avec Express
let express = require('express');
let app = express();
// dirname reprends tout le chemin vers le dossier parent de notre fichier App.js
app.set('view engine', 'ejs');
app.listen(8080);

// Fusion du ejs avec mes data
// Une route => utiliser l'app, avec une méthode et un chemin (path)
app.get('/', function (request, response) {
    response.render('index.ejs', { nom: "Rudi" });
});

