// HTML Elements
const searchBtn = document.getElementById('search-button')
const clearBtn = document.getElementById('clear-history')
const history = document.getElementById('history')
let todayWeather = document.getElementById('todays-weather')
const cityName = document.getElementById('city-name')
const currentIcon = document.getElementById('weather-icon')
const currentDesc = document.getElementById('desc')
const todayTemp = document.getElementById('temp')
const todayHumid = document.getElementById('humid')
const todayWind = document.getElementById('wind')
const todayUv = document.getElementById('uv')
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

    

}

// Event listeners
searchBtn.addEventListener('click', formHandler)