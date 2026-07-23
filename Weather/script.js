const weatherForm = document.querySelector("#cityForm");
const userInput = document.querySelector("#input");
const card = document.querySelector(".card");
const apikey = "e5bad28e9ac5bf6ca7dff39c2e8bcd52";

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    city = userInput.value;
    if(city){
        try{
            weatherData = await getWeatherData();
            displayWeather(weatherData);
        }
        catch(error){
            displayError(error)
        }
    }
    else{
        displayError("Please, enter a city")
    }
    userInput.value = "";
});

async function getWeatherData(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Data Not Found!");
    }
    const weatherData = await response.json();
    return weatherData   
}

function displayWeather(data){
    console.log(data)
    const {name : city, 
           main : {humidity: humidity, temp: temperature},
           weather: [{description: desc}]} = data;

    card.textContent = "";
    card.style.display = "block";

    const cityDisplay = document.createElement('h1');
    const temperatureDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const emojiDisplay = document.createElement('p');

    cityDisplay.textContent = city;
    temperatureDisplay.textContent = `${(temperature - 273.15).toFixed(1)} °C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`
    descDisplay.textContent = desc;

    cityDisplay.classList.add("city");
    temperatureDisplay.classList.add("temperature");
    humidityDisplay.classList.add("humidity");
    descDisplay.classList.add("description");
    

    card.appendChild(cityDisplay);
    card.appendChild(temperatureDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);

}

function displayError(message){
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorMessage')
    card.textContent = "";
    card.style.display = "block";
    card.appendChild(errorDisplay);
}

