// Make a request tothe Open Weather Map API for the current local weather
var apiKey = '0fb4f053e370f0192e42e2adda3c0bfa';
// var searchURL =`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
var searchButtonEl = document.querySelector('#startsearch');
var searchCityEl = document.querySelector('#searchcity');

// var url = baseURL ='/weather?appid=' + api;

function getWeather(cityName) {
    // fetch request gets a list of all the repos for the node.js organization

     console.log(cityName);
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
  
    fetch(requestUrl)
      .then(function (response) {
        console.log(response.json)
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        var htmlcard = document.getElementById('Five-day-Forecast');
        htmlcard.innerHTML = ""
        for (let i =0; i< 0, i<data.list.length; i =i+8){
         
          var cardEl = document.createElement('article')
          cardEl.classList.add('card')
          var bodyEl = document.createElement('h6')
          bodyEl.textContent = "Temperature : "+ data.list[i].main.temp
          var humidityEl = document.createElement('h6')
          humidityEl.textContent = "Humidity : "+ data.list[i].main.humidity
          var windEl = document.createElement('h6')
          windEl.textContent = "Wind speed is : "+ data.list[i].wind.speed
          var descriptionEl = document.createElement('h6')
          descriptionEl.textContent = "It is : "+ data.list[i].weather[0].description
          var imgEl = document.createElement('img')
          imgEl.setAttribute('src',` https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png` )
          cardEl.appendChild(bodyEl)
          cardEl.appendChild(humidityEl)
          cardEl.appendChild(windEl)
          cardEl.appendChild(descriptionEl)
          cardEl.appendChild(imgEl)
          htmlcard.appendChild(cardEl)
        }
    })
}


document.getElementById('fetch-button').addEventListener('click',function(Event){
  Event.preventDefault()
  var city = document.getElementById('search-input').value
  getWeather(city)
  var prevData = JSON.parse(localStorage.getItem('Weather-Dashboard')) || []
  prevData.push(city)
  localStorage.setItem('Weather-Dashboard', JSON.stringify(prevData))
  displayLocalstorage()
})
 
function displayLocalstorage (){
  var prevData = JSON.parse(localStorage.getItem('Weather-Dashboard')) || []
  var asideEl = document.getElementById("Search-History")
  asideEl.innerHTML = ""
  for (let i =0; i<prevData.length; i++) {
    var bodyEl = document.createElement('button')
    bodyEl.textContent = prevData[i]
    asideEl.append(bodyEl)
  }
}
//  local storage. 
displayLocalstorage()