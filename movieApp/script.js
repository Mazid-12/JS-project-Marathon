const form = document.querySelector("#input-form");
const input = document.querySelector(".input");
const card = document.querySelector(".movie-card");


form.addEventListener("submit", async event=>{
    event.preventDefault();
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
