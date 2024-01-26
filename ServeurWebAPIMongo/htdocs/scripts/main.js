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
            // Titre du film
            const movieTitle = document.getElementById("movieTitle");
            movieTitle.innerText = movie.Series_Title;
            // Affiche du film
            const movieImg = document.getElementById("movieImage");
            movieImg.src = movie.Poster_Link;
            // Année de sortie
            const releasedYear = document.getElementById("releasedYear");
            releasedYear.innerText = "Année de sortie : " + movie.Released_Year
            // Durée du film
            const runtime = document.getElementById("runtime");
            runtime.innerText = "Durée : " + movie.Runtime
            // Genre
            const genre = document.getElementById("genre");
            genre.innerText = "Durée : " + movie.Genre
            // Note
            const rating = document.getElementById("rating");
            rating.innerText = "Note : " + movie.IMDB_Rating + "/10"
            // Synopsis
            const overview = document.getElementById("overview");
            overview.innerText = "Synopsis : " + movie.Overview
            // Directeur
            const director = document.getElementById("director");
            director.innerText = "Directeur : " + movie.Director
            // Acteur 1
            const acteur = document.getElementById("acteur");
            acteur.innerText = "Acteurs : " + movie.Star1 + ", " + movie.Star2 + ", " + movie.Star3 + ", " + movie.Star4
            // Delete icon
            const trashImg = document.getElementById("trashImage");
            trashImg.src = "images/trash.png";
            trashImg.width = "64";
            // Delete link
            const trashAnchor = document.getElementById("trashAnchor");
            trashAnchor.href = "javascript:deleteMovie('" + movie._id + "')";
            // Add icon
            const addImg = document.getElementById("addImage");
            addImg.src = "images/add.ico";
            addImg.width = "64";
            // Add link
            const addAnchor = document.getElementById("addAnchor");
            addAnchor.href = "addMovie.html";
            // Edit icon
            const editImg = document.getElementById("editImage");
            editImg.src = "images/edit.png";
            editImg.width = "64";
            // Edit link
            const editAnchor = document.getElementById("editAnchor");
            editAnchor.href = "editMovie.html?id=" + movie._id;
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