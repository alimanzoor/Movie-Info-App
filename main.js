const uProgress = new UProgress();

$(function () {

  const movieText = sessionStorage.getItem('movieText');

  // if searchText is available
  if (movieText) {
    $('#textInput').focus();
    $('#textInput').val(movieText);
    uProgress.options({doneDuration: 250}).start();
    getMovies(movieText);
  } else {
    const noData = '<div id="noData" class="text-center">No Data entered</div>';
    $('#movies').html(noData);
  }

  // onSubmit
  $('#inputSearch').on('submit', (e) => {
    uProgress.options({doneDuration: 250}).start();
    let textInput = $('#textInput').val().trim();
    getMovies(textInput);
    sessionStorage.setItem('movieText', textInput);
    $('#inputSearch')[0].reset();
    e.preventDefault();
  });
});

let getMovies = (textInput) => {
  const key = 'e1c5befc';
  const url = `https://www.omdbapi.com/?apikey=${key}`;


  axios.get(url, {
      params: {
        s: textInput
      }
    })
    .then(function (response) {
      uProgress.set(1000, 0.25);
      const parent = document.getElementById('movies');
      renderLoader(parent);
      const movies = response.data.Search;
      setTimeout(() => {
        let html = '';
        $.each(movies, (index, movie) => {
          html += `
            <div class="col-sm-4 text-center">
              <div class="card-item card mb-4">
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
        uProgress.done();
      }, 1000);
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
  uProgress.options({doneDuration: 250}).start();
  uProgress.set(1000, 0.25);
  const parent = document.getElementById('movie');
  renderLoader(parent);
  const movieId = sessionStorage.getItem('movieId');
  const key = 'e1c5befc';
  const url = `https://www.omdbapi.com/?apikey=${key}`;

  setTimeout(() => {
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
        uProgress.done();
      })
      .catch(function (error) {
        console.log(error);
      });
  }, 1000);
};

let renderLoader = (parent) => {
  $('#noData').remove();
  const loader = `
    <div class="loader">
      <img src="oval.svg" alt="loader">
    </div>
  `;
  $(parent).html(loader);
};
