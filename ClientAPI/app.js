let https = require('https');

// Envoyer une requête de type GET à l'adresse :
// https://api.open-meteo.com/v1/forecast?latitude=50.85&longitude=4.37&hourly=temperature_2m
// Pour obtenir une réponse JSON
let request = {
    "host": "api.open-meteo.com",
    "port": 443,
    "path": "/v1/forecast?latitude=50.85&longitude=4.37&hourly=temperature_2m"
};

https.get(request, receiveResponseCallback);

function receiveResponseCallback(response) {
    let rawData = "";
    response.on('data', (chunk) => { rawData += chunk; });
    response.on('end', function () {
        console.log(rawData)
    });
}