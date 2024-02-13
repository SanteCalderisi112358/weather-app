console.log('Weather App')
import { apiKey } from './api_key.js';
const inputEl = document.querySelector('.input')
const bodyEl = document.querySelector('body')
const backgrounds = [
    'https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1601134467661-3d775b999c8b?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1514632595-4944383f2737?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

const backgroundImageFuncion = (arrayImg)=>{
    console.log(arrayImg.length)
   let currentImage = 0
   setInterval(()=>{
bodyEl.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url('${arrayImg[currentImage]}')`
bodyEl.style.backgroundSize = 'cover'
bodyEl.style.backgroundPosition = 'center'
currentImage++
if(currentImage===arrayImg.length-1) currentImage=0  
 },5000)
   
   
}

backgroundImageFuncion(backgrounds)

inputEl.addEventListener('keyup',(e)=>{
    
     e.preventDefault()
  if(e.key === 'Enter'){
    let citySearch = inputEl.value;
    searchWeatherByCityName(citySearch)
    inputEl.value = ''
  }
    
    
})


const searchWeatherByCityName = async (cityName)=>{
    document.querySelector('.error-container').style.display = 'none'
    try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=it`)
     console.log(response)
     if(!response.ok) throw new Error('Città non trovata')
    const data = await response.json()
    console.log(data)
    let temperature = data.main.temp
    let humidity = data.main.humidity
    let pressure = data.main.pressure
    let city = data.name
    let icon = data.weather[0].icon
    let country = data.sys.country.toLowerCase()
    let flagUrl = `https://openweathermap.org/images/flags/${country}.png`
    let lat = data.coord.lat
    let lon = data.coord.lon
    console.log(temperature, humidity, pressure, city, icon, country, flagUrl, lat,lon)

    printCoords(lat,lon)   
    printTemperature(temperature)
    infoCity(city, country, flagUrl,`https://openweathermap.org/img/wn/${icon}@2x.png`)
    printPression(pressure)
    printHumidity(humidity)
    showContainerDate()
    } catch (error) {
        let errorMessage = error.message
        console.log(errorMessage)
        printErrorMessage(errorMessage)
    }
    


}

const printTemperature = (temperatureDate) =>{
    let temperatureEl = document.querySelector('.temperature-details')
    temperatureEl.innerText = temperatureDate
}

const printHumidity = (humidityDate) => {
    let humidityEl = document.querySelector('.humidity-details')
    humidityEl.innerText = humidityDate
}
const printPression = (pressionDate) => {
    let pressionEl = document.querySelector('.pression-details')
    pressionEl.innerText = pressionDate
}

const infoCity = (nameData, countryData, flagUrlData, iconWeather) =>{
    let nameCityEl = document.querySelector('.city')
    let countryEl = document.querySelector('.country')
    let flagEl = document.querySelector('.country-flag')
    let iconEl = document.querySelector('.icon')

    nameCityEl.innerText = nameData
    countryEl.innerText = countryData.toUpperCase()
    flagEl.style.backgroundImage = `url(${flagUrlData})`
    iconEl.src = iconWeather
    console.log(nameData, countryData, flagUrlData,iconWeather)
}

const printCoords = (latData, longData) =>{
    let latEl = document.querySelector('.lat')
    let longEl = document.querySelector('.long')
    latEl.innerText = latData
    longEl.innerText = longData
}

const showContainerDate =()=>{
    document.querySelector('.info-city').style.display = 'flex'
    document.querySelector('.info-container').style.display = 'flex'
    document.querySelector('.icon-container').style.display = 'flex'
}

const printErrorMessage = (errorText)=>{
    document.querySelector('.error-container').style.display = 'block'
    document.querySelector('.info-city').style.display = 'none'
    document.querySelector('.info-container').style.display = 'none'
    document.querySelector('.icon-container').style.display = 'none'
    let errorParagraphEl = document.querySelector('.error-message')
errorParagraphEl.innerText = errorText
}