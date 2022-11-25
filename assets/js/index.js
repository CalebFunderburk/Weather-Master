// Display current date and time
const currentTime = moment();
const timeDisplay = document.getElementById('time-display')
timeDisplay.textContent = currentTime.format("dddd MMMM Do, YYYY h:mm a")

// HTML Elements
const searchBtn = document.getElementById('search-button')
const clearBtn = document.getElementById('clear-history')
const history = document.getElementById('history')
const historyList = document.getElementById('history-list')
let todayWeather = document.getElementById('todays-weather')
const cityName = document.getElementById('city-name')
const currentIcon = document.getElementById('weather-icon')
const currentTemp = document.getElementById('temp')
const currentHumid = document.getElementById('humid')
const currentWind = document.getElementById('wind')
const currentUv = document.getElementById('uv')
let fivedayHeader = document.getElementById('fiveday-header')

// Search history
let cityArray = []

// City search submission handler
const formHandler = (event) => {

    event.preventDefault()
    const citySearch = document.getElementById('city-search').value.trim()


    if (!citySearch) {

        alert('Please enter a city name')

    } else {

        getCurrent(citySearch)
        // getForecast(citySearch)

        cityArray.push(citySearch)
        localStorage.setItem('citySearch', JSON.stringify(cityArray))

    }
}

// Handler for clicking cities in search history
const clickHandler = (event) => {

    const cityHistory = event.currentTarget.textContent

    getCurrent(cityHistory)
    // getForecast(cityHistory)

}

// API Fetch request for current weather
const getCurrent = (citySearch) => {

    const key = '3cc750875e9720f210c3ade16c226b21'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${key}&units=imperial`

    fetch(url)
        .then((res) => {
            if (!res.ok) {
                alert('Error' + res.statusText)
            } else {
                res.json()
                    .then((data) => {
                        displayCurrent(data, citySearch)
                    })
            }
        })
        .catch((err) => {
            console.log(err)
        })

}

// cityUv function goes here

const displayCurrent = (data, citySearch) => {
    console.log(citySearch)
    console.log(data)

    // Display current weather data
    cityName.innerHTML = data.name
    currentIcon.src = "assets/images/" + data.weather[0].icon + ".png"
    currentIcon.alt = "Weather icon"
    currentTemp.innerHTML = data.main.temp + " °F"
    currentHumid.innerHTML = data.main.humidity + "%"
    currentWind.innerHTML = data.wind.speed + " MPH"

    // Save search to history
    const newHistory = document.createElement('li')
    newHistory.className = 'list-group-item'
    newHistory.textContent = citySearch
    newHistory.addEventListener('click', clickHandler)
    historyList.appendChild(newHistory)

}

// Event listeners
searchBtn.addEventListener('click', formHandler)