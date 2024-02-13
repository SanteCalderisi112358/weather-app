console.log('Weather App')
const inputEl = document.querySelector('.input')
const btnEl = document.querySelector('.btn')
btnEl.addEventListener('click',()=>{
    let citySearch = inputEl.value;
    searchWeatherByCityName(citySearch)
    inputEl.value = ''
})


const searchWeatherByCityName = async (cityName)=>{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=36db03e7039021bb00dfd7a6df084245`)
    const data = await response.json()
    console.log(data)
    let temperature = data.main.temp
    let humidity = data.main.humidity
    let pressure = data.main.pressure
    console.log(temperature, humidity, pressure)
}