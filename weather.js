let appId = '375ec9ef069fb0abcfe551a5151113c6'
let units = 'imperial'
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) 
        searchMethod = 'zip';  
    else 
    searchMethod = 'q'; 

        
    }



function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch((`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appId=${appId}&units=${units}`))
        .then(result => {
            return result.json();
        })
        .then(result => {
            init(result)
        })
}


function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")'
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")'
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("rain.jpg")'
            break;

        case 'Thunderstorms':
            document.body.style.backgroundImage = 'url("storm.jpg")'
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")'
            break;


        default:
            break;

        }
        console.log(resultFromServer)
        
        let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader')
        let temperatureElement = document.getElementById('temperature')
        let humidityElement = document.getElementById('humidity')
        let windSpeedElement = document.getElementById('windSpeed')
        let cityHeader = document.getElementById('cityHeader')
        let weatherIcon = document.getElementById('documentIconImg');
        let dewpointElement = document.getElementById('dewpoint')
        let sunriseElement = document.getElementById('sunrise')
        let sunsetElement = document.getElementById('sunset')
        
        weatherIcon.src = `http://openweathermap.org/img/wn/${resultFromServer.weather[0].icon}.png`
        
        
        let resultDescription = resultFromServer.weather[0].description;
        let windSpeedMph = (resultFromServer.wind.speed)
        let humidity = resultFromServer.main.humidity
        let temperature = resultFromServer.main.temp
        let location = resultFromServer.name

        //calculate dewpoint. Show it if humidity is at 50% or higher // 6.13.20 - when humidity 53%, divided by 2.8 to get 58 dewpoint
        let dewpoint = temperature - ((100 - humidity)/2.8)

        //if dewpoint meets a certain condition - show an icon reflecting conditions
        if (dewpoint > 61 && dewpoint < 70 && humidity >= 50) 
            dewpointElement.innerHTML = `&#128531 Dewpoint ${Math.floor(dewpoint)} &#176`
            
        
             if (dewpoint > 70 && humidity >= 50) 
                dewpointElement.innerHTML = `&#128551 Dewpoint ${Math.floor(dewpoint)} &#176`
                
            
                 if (dewpoint < 61 && dewpoint < 70 &&humidity >= 50) 
                    dewpointElement.innerHTML = `&#129312 Dewpoint ${Math.floor(dewpoint)} &#176`
                
                   /* let storage = window.localStorage
                    
                    function populateStorage() {
                        storage.setItem('temp', temperature);
                        storage.setItem('humidity', humidity);
                        storage.setItem('dewpoint', dewpoint);
                        storage.setItem('location', location);

                        return storage
                      }
                    console.log(populateStorage())
                    */
                


        //calculate Sunrise
        sunrise = new Date(resultFromServer.sys.sunrise * 1000)
        //calculate Sunset
        sunset = new Date(resultFromServer.sys.sunset * 1000)
        
                      
        console.log(sunrise);
        console.log(sunset);
        console.log(dewpoint)


        
        weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
        temperatureElement.innerHTML = `${Math.floor(temperature)} &#176`;

      
        windSpeedElement.innerHTML = `Winds at ${Math.floor(windSpeedMph)} mph`;
        cityHeader.innerHTML = resultFromServer.name;
        humidityElement.innerHTML = `Humidity levels at ${humidity}%`
        sunriseElement.innerHTML = `&#9788 Sunrise ${sunrise}`
        sunsetElement.innerHTML = `&#9790 Sunset ${sunset}`
        
        
        setPositionForWeatherInfo()
    }

    function setPositionForWeatherInfo() {
        let weatherContainer = document.getElementById('weatherContainer')
        let weatherContainerHeight = weatherContainer.clientHeight;
        let weatherContainerWidth = weatherContainer.clientWidth;

        weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`
        weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`
        weatherContainer.style.visibility = 'visible'

    }
        
        document.getElementById('searchBtn').addEventListener('click', () => {
            let searchTerm = document.getElementById('searchInput').value;
            if(searchTerm)
            searchWeather(searchTerm)
        })

