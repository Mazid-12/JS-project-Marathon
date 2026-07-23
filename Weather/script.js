const weatherForm = document.querySelector("#cityForm");
const userInput = document.querySelector("#input");
const card = document.querySelector(".card");
const apikey = "e5bad28e9ac5bf6ca7dff39c2e8bcd52";

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    city = userInput.value;
    if(city){
        weatherData = await getWeatherData();
        //console.log(weatherData);
        displayWeather(weatherData);
    }
    else{
        //display error
    }
});

async function getWeatherData(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(url);
    const weatherData = await response.json();

    //console.log(weatherData);
    return weatherData
    
}

function displayWeather(data){
    console.log(data)
    const {name: city, main : 
        {humidity: humidity, temp: temperature}} = data;

    card.textContent = "";
    card.style.display = "block";

    const cityDisplay = document.createElement('h1');
    const temperatureDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const emojiDisplay = document.createElement('p');
    const errorDisplay = document.createElement('p');

    cityDisplay.textContent = city;
    temperatureDisplay.textContent = `${(temperature - 273.15).toFixed(1)} °C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`

    cityDisplay.classList.add("city");
    temperatureDisplay.classList.add("temperature");
    humidityDisplay.classList.add("humidity")



    card.appendChild(cityDisplay);
    card.appendChild(temperatureDisplay);
    card.appendChild(humidityDisplay);


    




}
