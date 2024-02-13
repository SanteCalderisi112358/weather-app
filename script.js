console.log('Weather App')
import { apiKey } from './api_key.js';
const inputEl = document.querySelector('.input')
const btnEl = document.querySelector('.btn')
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
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
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