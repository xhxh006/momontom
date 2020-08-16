const WEATHER_API_KEY = "c78b24b80c3103d39d630f55d04ef568"
const weather = weatherBox.querySelector("span")

function getWeather(lat, long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`
    })
}
function saveCoords(coordsObj){
    localStorage.setItem("coords", JSON.stringify(coordsObj))
    // localStorage.removeItem("coords")
}
function handleGeoSuccess(position){
    console.log(position)
    
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj)
}
function handleGeoError(){
    console.log("Can't access geo location")
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}
function loadCoords(){
    // localStorage.removeItem("coords")
    const loadedCoords = localStorage.getItem("coords")
    if(loadedCoords === null){
        askForCoords()
    } else {
        const parseCoords = JSON.parse(loadedCoords)
        // saveCoords()
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }

}

function init(){
    loadCoords()
}

init()