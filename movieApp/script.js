const form = document.querySelector("#input-form");
const input = document.querySelector(".input");
const card = document.querySelector(".movie-card");
const searchBox = document.querySelector(".search-list-box")

form.addEventListener("submit", async event=>{
    event.preventDefault();
    searchBox.style.display = 'none';
    let movie_input = input.value;
    if(movie_input){
        try{
            movie = movie_input.replace(' ', '+').toLowerCase();
            movie_data = await getMovie(movie);
            console.log(movie_data.Response)
            if(movie_data.Response === 'True'){
                displayMovie(movie_data);
            }
            else{
                console.log(movie_data)
                displayError(`Error: ${movie_data.Error}`)
            }
        }
        catch(error){
            displayError(error.message)
        }
    }
    else{
        displayError("Please enter a movie title!")
    }
    
});

async function getMovie(title){
    const url = `http://www.omdbapi.com/?t=${title}&apikey=cb701f24`
           
        const movieData = await fetch(url);
        return await movieData.json();
    
}

function displayMovie(movie_data){
    const {Title: movie_title,
           Year: movie_year,
           Director: movie_director,
           Genre: movie_genre,
           Plot: movie_plot,
           Actors: movie_stars,
           Poster: movie_poster} = movie_data;
   
    card.style.display = 'block';
    card.textContent = "";

    const poster = document.createElement("img");
    const basic_info = document.createElement("h3");
    const plot = document.createElement("h4");
    const plot_value = document.createElement("p");
    const directed_by = document.createElement("h4");
    const director_value = document.createElement("p");
    const stars = document.createElement("h4");
    const stars_value = document.createElement("p");


    poster.setAttribute('src', movie_poster);
    poster.setAttribute('alt', 'Movie Poster');
    basic_info.textContent = `${movie_year}, ${movie_genre}`
    plot.textContent = "Plot";
    directed_by.textContent = "Directed by";
    stars.textContent = "Stars";
    plot_value.textContent = movie_plot;
    director_value.textContent = movie_director;
    stars_value.textContent = movie_stars;

    poster.classList.add('poster');

    card.appendChild(poster);
    card.appendChild(basic_info);
    card.appendChild(plot);
    card.appendChild(plot_value)
    card.appendChild(directed_by);
    card.appendChild(director_value);
    card.appendChild(stars);
    card.appendChild(stars_value);

}

function displayError(message){
    card.style.display = 'block';
    card.textContent = "";

    const errorMessage = document.createElement('p');
    errorMessage.classList.add("error");
    
    errorMessage.textContent = message

    card.appendChild(errorMessage);
    
}

input.addEventListener('input', event=>{
    let timer = 0;
    clearTimeout(timer)
    timer = setTimeout(async ()=>{
        search_data = await searchMovie(input.value)
        if(search_data.Response === 'True'){
            displaySearch(search_data)
        }
        else{
            displaySearchError(search_data)
            console.log("t")
        }
        
    }, 1000)
})

async function searchMovie(term){
    const url = `http://www.omdbapi.com/?s=${term}&apikey=cb701f24`;
    const data = await fetch(url);
    return await data.json();
}

function displaySearch(searchData){
    const {
        Search: search_list,
        totalResults: search_total} = searchData;
        console.log(search_total);

        searchBox.style.display = "block";
        searchBox.textContent = "";

        const heading = document.createElement('h1');
        heading.textContent = `MOVIES (${search_total}) - VIEW ALL:`;
        searchBox.appendChild(heading);

        search_list.forEach(async movie => {
            const data = await getMovie(movie.Title);
            
            const {Title: search_title,
                   Poster: search_poster} = data;
            const movieBox = document.createElement('div');
            const searchPoster = document.createElement('img');
            const searchTitle = document.createElement('p');

            movieBox.classList.add('search-movie');
            searchPoster.setAttribute('src', searchPoster);
            searchPoster.setAttribute('alt', 'not found');
            searchTitle.textContent = search_title;

            searchPoster.classList.add('.search-poster');

            movieBox.appendChild(searchPoster);
            movieBox.appendChild(searchTitle);
            searchBox.appendChild(movieBox);

        });
}

function displaySearchError(){
    
}
