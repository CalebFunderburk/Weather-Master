// Display current date and time
const currentTime = moment();
const timeDisplay = document.getElementById('time-display')
timeDisplay.textContent = currentTime.format("dddd MMMM Do, YYYY h:mm a")

// HTML Elements
const searchBtn = document.getElementById('search-button')
const clearBtn = document.getElementById('clear-history')
const history = document.getElementById('history')
const historyList = document.getElementById('history-list')
const cityName = document.getElementById('city-name')
const currentIcon = document.getElementById('weather-icon')
const currentTemp = document.getElementById('temp')
const currentHumid = document.getElementById('humid')
const currentWind = document.getElementById('wind')
const currentUv = document.getElementById('uv')
const forecastHeader = document.getElementById('forecast-header')
const forecast1 = document.getElementById('forecast-1')
const forecast2 = document.getElementById('forecast-2')
const forecast3 = document.getElementById('forecast-3')
const forecast4 = document.getElementById('forecast-4')
const forecast5 = document.getElementById('forecast-5')

// Search history
let cityArray = []

// City search submission handler
const formHandler = (event) => {

    event.preventDefault()
    const citySearch = document.getElementById('city-search').value.trim()

    if (!citySearch) {
        alert('Please enter a city name')
    } else {

        removeContent()

        getCurrent(citySearch)
        getForecast(citySearch)

        cityArray.push(citySearch)
        localStorage.setItem('citySearch', JSON.stringify(cityArray))
    }
}

// Handler for clicking cities in search history
const clickHandler = (event) => {
    removeContent()

    const cityHistory = event.currentTarget.textContent
    getCurrent(cityHistory)
    getForecast(cityHistory)

}

// Fetch current weather API data
const getCurrent = (citySearch) => {

    // API requirements
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
                    }
                )
            }
        })
        .catch((err) => {
            alert("Unable to connect to Open Weather")
        }
    )

}

// Display current weather data
const displayCurrent = (data, citySearch) => {

    // Format & display current weather data
    cityName.innerHTML = data.name
    currentIcon.src = "assets/images/" + data.weather[0].icon + ".png"
    currentIcon.alt = "Weather icon"
    currentTemp.innerHTML = data.main.temp + " °F"
    currentHumid.innerHTML = data.main.humidity + "%"
    currentWind.innerHTML = data.wind.speed + " MPH"

    // Format & save search to history
    const newHistory = document.createElement('li')
    newHistory.className = 'list-group-item'
    newHistory.textContent = citySearch
    newHistory.addEventListener('click', clickHandler)
    historyList.appendChild(newHistory)

    //  Use lat & lon to acquire current UV index
    const lat = data.coord.lat
    const lon = data.coord.lon
    searchUv(lat, lon, citySearch)

}

// Fetch and display current UV index API data
const searchUv = (lat, lon, citySearch) => {

    // API requirements
    const key = '3cc750875e9720f210c3ade16c226b21'
    const url = `https://api.openweathermap.org/data/2.5/uvi?q=${citySearch}&appid=${key}&lat=${lat}&lon=${lon}`

    fetch(url)
        .then((res) => {
            if (!res.ok) {
                alert(`Error: ${res.statusText}`)
            } else {
                res.json()
                    .then((data) => {
                        currentUv.innerHTML = `${data.value} UV`
                    }
                )
            }
        })
        .catch((err) => {
            alert('Unable to connect to Open Weather')
        }
    )
}

// Fetch 5 day forecast API data
const getForecast = (citySearch) => {
    
    // API requirements
    const key = '3cc750875e9720f210c3ade16c226b21'
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&units=imperial&cnt=6&appid=${key}`

    fetch(url)
    .then((res) => {
        if (!res.ok) {
            alert(`Error: ${res.statusText}`)
        } else {
            res.json()
                .then((data) => {
                    displayForecast(data.list)
                }
            )
        }
    })
    .catch((err) => {
        alert('Unable to connect to Open Weather')
    })
}

// Display 5 day forecast data
const displayForecast = (data) => {

    // Header
    forecastHeader.innerHTML = '5 Day Forecast'

    // Format & display dates
    const date1 = document.createElement('p')
    date1.setAttribute('id', 'date-1')
    const date1Format = moment().add(1, 'days').format('L')
    date1.innerHTML = date1Format
    forecast1.appendChild(date1)

    const date2 = document.createElement('p')
    date2.setAttribute('id', 'date-2')
    const date2Format = moment().add(2, 'days').format('L')
    date2.innerHTML = date2Format
    forecast2.appendChild(date2)

    const date3 = document.createElement('p')
    date3.setAttribute('id', 'date-3')
    const date3Format = moment().add(3, 'days').format('L')
    date3.innerHTML = date3Format
    forecast3.appendChild(date3)

    const date4 = document.createElement('p')
    date4.setAttribute('id', 'date-4')
    const date4Format = moment().add(4, 'days').format('L')
    date4.innerHTML = date4Format
    forecast4.appendChild(date4)

    const date5 = document.createElement('p')
    date5.setAttribute('id', 'date-5')
    const date5Format = moment().add(5, 'days').format('L')
    date5.innerHTML = date5Format
    forecast5.appendChild(date5)

    // Format & diplay icons
    const icon1 = document.createElement('img')
    icon1.setAttribute('id', 'icon-1')
    icon1.src = `assets/images/${data[0].weather[0].icon}.png`
    icon1.alt = 'Weather icon'
    forecast1.appendChild(icon1)

    const icon2 = document.createElement('img')
    icon2.setAttribute('id', 'icon-2')
    icon2.src = `assets/images/${data[1].weather[0].icon}.png`
    icon2.alt = 'Weather icon'
    forecast2.appendChild(icon2)

    const icon3 = document.createElement('img')
    icon3.setAttribute('id', 'icon-3')
    icon3.src = `assets/images/${data[2].weather[0].icon}.png`
    icon3.alt = 'Weather icon'
    forecast3.appendChild(icon3)

    const icon4 = document.createElement('img')
    icon4.setAttribute('id', 'icon-4')
    icon4.src = `assets/images/${data[3].weather[0].icon}.png`
    icon4.alt = 'Weather icon'
    forecast4.appendChild(icon4)

    const icon5 = document.createElement('img')
    icon5.setAttribute('id', 'icon-5')
    icon5.src = `assets/images/${data[4].weather[0].icon}.png`
    icon5.alt = 'Weather icon'
    forecast5.appendChild(icon5)

    // Format & display temperature
    const temp1 = document.createElement('p')
    temp1.setAttribute('id', 'temp-1')
    temp1.innerHTML = `${data[0].main.temp}  °F`
    forecast1.appendChild(temp1)

    const temp2 = document.createElement('p')
    temp2.setAttribute('id', 'temp-2')
    temp2.innerHTML = `${data[1].main.temp}  °F`
    forecast2.appendChild(temp2)

    const temp3 = document.createElement('p')
    temp3.setAttribute('id', 'temp-3')
    temp3.innerHTML = `${data[2].main.temp}  °F`
    forecast3.appendChild(temp3)

    const temp4 = document.createElement('p')
    temp4.setAttribute('id', 'temp-4')
    temp4.innerHTML = `${data[3].main.temp}  °F`
    forecast4.appendChild(temp4)

    const temp5 = document.createElement('p')
    temp5.setAttribute('id', 'temp-5')
    temp5.innerHTML = `${data[4].main.temp}  °F`
    forecast5.appendChild(temp5)

    // Format & display wind speed
    const wind1 = document.createElement('p')
    wind1.setAttribute('id', 'wind-1')
    wind1.innerHTML = `${data[0].wind.speed} MPH`
    forecast1.appendChild(wind1)

    const wind2 = document.createElement('p')
    wind2.setAttribute('id', 'wind-2')
    wind2.innerHTML = `${data[1].wind.speed} MPH`
    forecast2.appendChild(wind2)

    const wind3 = document.createElement('p')
    wind3.setAttribute('id', 'wind-3')
    wind3.innerHTML = `${data[2].wind.speed} MPH`
    forecast3.appendChild(wind3)

    const wind4 = document.createElement('p')
    wind4.setAttribute('id', 'wind-4')
    wind4.innerHTML = `${data[3].wind.speed} MPH`
    forecast4.appendChild(wind4)

    const wind5 = document.createElement('p')
    wind5.setAttribute('id', 'wind-5')
    wind5.innerHTML = `${data[4].wind.speed} MPH`
    forecast5.appendChild(wind5)

    // Format & display humidity
    const humid1 = document.createElement('p')
    humid1.setAttribute('id', 'humid-1')
    humid1.innerHTML = `${data[0].main.humidity}%`
    forecast1.appendChild(humid1)

    const humid2 = document.createElement('p')
    humid2.setAttribute('id', 'humid-2')
    humid2.innerHTML = `${data[1].main.humidity}%`
    forecast2.appendChild(humid2)

    const humid3 = document.createElement('p')
    humid3.setAttribute('id', 'humid-3')
    humid3.innerHTML = `${data[2].main.humidity}%`
    forecast3.appendChild(humid3)

    const humid4 = document.createElement('p')
    humid4.setAttribute('id', 'humid-4')
    humid4.innerHTML = `${data[3].main.humidity}%`
    forecast4.appendChild(humid4)

    const humid5 = document.createElement('p')
    humid5.setAttribute('id', 'humid-5')
    humid5.innerHTML = `${data[4].main.humidity}%`
    forecast5.appendChild(humid5)
}

// Remove content from page
const removeContent = () => {
    console.log('hello')
    if (forecastHeader.innerHTML === '5 Day Forecast') {
        
        // Target all 5 day forecast elements
        const date1 = document.getElementById('date-1')
        const date2 = document.getElementById('date-2')
        const date3 = document.getElementById('date-3')
        const date4 = document.getElementById('date-4')
        const date5 = document.getElementById('date-5')
        const icon1 = document.getElementById('icon-1')
        const icon2 = document.getElementById('icon-2')
        const icon3 = document.getElementById('icon-3')
        const icon4 = document.getElementById('icon-4')
        const icon5 = document.getElementById('icon-5')
        const temp1 = document.getElementById('temp-1')
        const temp2 = document.getElementById('temp-2')
        const temp3 = document.getElementById('temp-3')
        const temp4 = document.getElementById('temp-4')
        const temp5 = document.getElementById('temp-5')
        const wind1 = document.getElementById('wind-1')
        const wind2 = document.getElementById('wind-2')
        const wind3 = document.getElementById('wind-3')
        const wind4 = document.getElementById('wind-4')
        const wind5 = document.getElementById('wind-5')
        const humid1 = document.getElementById('humid-1')
        const humid2 = document.getElementById('humid-2')
        const humid3 = document.getElementById('humid-3')
        const humid4 = document.getElementById('humid-4')
        const humid5 = document.getElementById('humid-5')

        // Remove all targeted elements from the page
        date1.remove()
        date2.remove()
        date3.remove()
        date4.remove()
        date5.remove()
        icon1.remove()
        icon2.remove()
        icon3.remove()
        icon4.remove()
        icon5.remove()
        temp1.remove()
        temp2.remove()
        temp3.remove()
        temp4.remove()
        temp5.remove()
        wind1.remove()
        wind2.remove()
        wind3.remove()
        wind4.remove()
        wind5.remove()
        humid1.remove()
        humid2.remove()
        humid3.remove()
        humid4.remove()
        humid5.remove()

        console.log('goodbye')
    }
}

// Event listener
searchBtn.addEventListener('click', formHandler)