fetch('http://127.0.0.1:8000/movies')
    .then(function (response) {
        return response.json();
    })
    .then(function (movies) {
        movies.forEach(movie => {
            const li = document.createElement("li");
            const anchor = document.createElement("a");
            anchor.href = "javascript:displayMovie('" + movie._id + "')";
            const textNode = document.createTextNode(movie.Series_Title);
            anchor.appendChild(textNode);
            li.appendChild(anchor);
            const element = document.getElementById("moviesList");
            element.appendChild(li);
        });

    })
    .catch(function (err) {
        console.log("Something went wrong!", err);
    });

function displayMovie(movieId) {
    fetch('http://127.0.0.1:8000/movies/' + movieId)
        .then(function (response) {
            return response.json();
        })
        .then(function (movie) {
            const h2 = document.getElementById("movieTitle");
            h2.innerText = movie.Series_Title;
            const movieImg = document.getElementById("movieImage");
            movieImg.src = movie.Poster_Link;
            const trashImg = document.getElementById("trashImage");
            trashImg.src = "images/trash.png";
            const trashAnchor = document.getElementById("trashAnchor");
            trashAnchor.href = "javascript:deleteMovie('" + movie._id + "')";
            const addImg = document.getElementById("addImage");
            addImg.src = "images/add.ico";
            const addAnchor = document.getElementById("addAnchor");
            addAnchor.href = "addMovie.html";
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });
}

function deleteMovie(movieId) {
    fetch('http://127.0.0.1:8000/movies/' + movieId, { method: 'DELETE' })
        .then(function (response) {
            //reload page
            location.reload();
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });
}