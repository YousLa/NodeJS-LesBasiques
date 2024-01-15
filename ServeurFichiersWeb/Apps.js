// ! Exercice : Programmer app.js (Npde) qui fait serveur de fichiers (web) avec express
// Serveur de fichiers, tous les fichiers dans le htdocs sont rendu
let express = require('express');
let app = express();
// dirname reprends tout le chemin vers le dossier parent de notre fichier App.js
// console.log(__dirname);
// On concatène htdocs pour signifié que c'est la racine de notre projet
app.use('/', express.static(__dirname + "/htdocs"));
app.listen(8080, function () {
    console.log('Listening on port 8080');
});
