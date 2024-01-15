fetch('http://127.0.0.1:8000/movies')
    .then(function (response) {
        return response.json();
        })
        .then(function (data) { 
            console.log(data);
        })
    .catch(function (err) { 
        console.log("Something went wrong!", err);
    });