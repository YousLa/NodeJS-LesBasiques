// ! Programmer app.js (Node) qui fait serveur de API (json) avec Express
let express = require('express');
let app = express();

app.listen(8080);
// http://localhost:8080/date
app.get('/date', function (req, res) {
    let now = new Date();
    res.setHeader('Content-Type', 'application/json');
    res.send("{date : '" + now.toString() + "'}");
})