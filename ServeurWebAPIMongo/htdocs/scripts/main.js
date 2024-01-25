fetch('http://127.0.0.1:8000/movies')
    .then(function (response) {
        return response.json();
        })
        .then(function (movies) { 
            movies.forEach(movie => {
                const para = document.createElement("li");
                const node = document.createTextNode(movie.Series_Title);
                para.appendChild(node);
                const element = document.getElementById("movies");
                element.appendChild(para);
            });
            
        })
    .catch(function (err) { 
        console.log("Something went wrong!", err);
    });