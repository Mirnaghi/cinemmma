// DOM elements
const mainContainer = document.querySelector('main');
const form = document.querySelector('form');
const search = document.querySelector('.search');

// API_KEY
const API_KEY = '4329cec3789339a1cde3ef8f016f7abd';

//  API_URL
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc' + '&api_key=' + API_KEY;

// SEARCH_API
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=4329cec3789339a1cde3ef8f016f7abd&query="';// IMAGE_URL
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';



// function to get movies
async function getMovies(apiUrl) {

    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.results)
    showMovies(data.results);
}

getMovies(API_URL);

function showMovies(movies) {
    mainContainer.innerHTML = '';

    movies.forEach(movie => {
        const {title, overview, poster_path, vote_average } = movie;

        mainContainer.innerHTML += `
         <div class="movie">
        <img src="${IMAGE_URL + poster_path}" alt="movie image">
        <div class="movie-detail">
          <h3 class="movie-title">${title}</h3>
          <span class="rate">${vote_average.toFixed(1)}</span>
        </div>
        <div class="movie-info">
          <h3 class="info">${overview}</h3>
        </div>
      </div>
        `
    })
}

// handle search
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const keyword = search.value;
    console.log(keyword);

    if(keyword && keyword !== '') {
        console.log(getMovies(SEARCH_API + keyword));
        search.value = '';
    } else {
        window.location.reload();
    }
})

// get movies with XMLHttpRequest
function getMoviesWithXHR(apiUrl, callback) {
    const request = new XMLHttpRequest();

    request.open('GET', apiUrl);
    request.send();

    request.addEventListener('readystatechange', () => {
        if(request.readyState === 4 && request.status === 200) {
            callback(undefined, request.responseText);
        }
        if(request.readyState === 4 && request.status !== 200) {
            callback(`Something went wrong and status is: ${request.status}`, undefined);
        }

    });


}

