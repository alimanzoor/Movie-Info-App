$(function () {
  $('#inputSearch').on('submit', (e) => {
    let textInput = $('#textInput').val();
    getMovies(textInput);
    $('#inputSearch')[0].reset();
    e.preventDefault();
  });
});

let getMovies = (textInput) => {
  const key = 'e1c5befc';
  const url = `http://www.omdbapi.com/?apikey=${key}`;

  axios.get(url, {
      params: {
        s: textInput
      }
    })
    .then(function (response) {
      const movies = response.data.Search;
      let html = '';
      $.each(movies, (index, movie) => {
        html += `
          <div class="col-sm-4 text-center">
            <div class="card mb-4">
              <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
              <div class="card-body">
                <h5 class="card-title text-truncate mb-3 mt-2">${movie.Title}</h5>
                <a onclick="getSelectMovie('${movie.imdbID}')" href="#" class="btn btn-primary btn-sm">More Details</a>
              </div>
            </div>
          </div>
        `;
      });

      $('#movies').html(html);
    })
    .catch(function (error) {
      console.log(error);
    });
};

let getSelectMovie = (id) => {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
};

let getMovie = () => {
  const movieId = sessionStorage.getItem('movieId');
  const key = 'e1c5befc';
  const url = `http://www.omdbapi.com/?apikey=${key}`;

  axios.get(url, {
      params: {
        i: movieId
      }
    })
    .then(function (response) {
      const movie = response.data;
      let html = `
        <div class="row">
          <div class="row well">
            <div class="col-sm-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-sm-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> <span>${movie.Genre}</span></li>
              <li class="list-group-item"><strong>Released:</strong> <span>${movie.Released}</span></li>
              <li class="list-group-item"><strong>Rated:</strong> <span>${movie.Rated}</span></li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> <span>${movie.imdbRating}</span></li>
              <li class="list-group-item"><strong>Director:</strong> <span>${movie.Director}</span></li>
              <li class="list-group-item"><strong>Writer:</strong> <span>${movie.Writer}</span></li>
              <li class="list-group-item"><strong>Actors:</strong> <span>${movie.Actors}</span></li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            <p>${movie.Plot}</p>

            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;
      $('#movie').html(html);
      console.log(movie);
    })
    .catch(function (error) {
      console.log(error);
    });
};