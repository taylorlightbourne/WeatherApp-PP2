//ELEMENTS
const city = document.querySelector('.location .city');
const now = new Date();
const date = document.querySelector('.location .date');
const temp = document.querySelector('.current .temp');
const weather_el = document.querySelector('.current .weather');
const hilow = document.querySelector('.hi-low');
const iconElement = document.querySelector(".icon");

const api = {
    key: "ac813b93c33296e12a37202012c9b25d",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const searchbox = document.querySelector('.input');
  searchbox.addEventListener('keypress', setQuery);

  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }

//FETCH API
  function getResults (query) {
    fetch(`${api.base}weather?zip=${query}&appid=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }

//CONVERT TEMPERATURE
const tempConvert = (kelvin) => {
  const fahrenheit = Math.round(((kelvin-273.15)*1.8)+32);
  return fahrenheit;
};


// DISPLAY WEATHER CONTENTS
function displayResults (weather) {
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  date.innerText = dateBuilder(now);
  temp.innerHTML = `${tempConvert(weather.main.temp)}<span>°F</span>`;
  weather_el.innerText = weather.weather[0].main;
  hilow.innerText = `Low: ${tempConvert(weather.main.temp_min)}°F / High: ${tempConvert(weather.main.temp_max)}°F`;
  weather.iconId = weather.weather[0].icon;
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
}


//ADD CURRENT DATE
function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  
  return `${day} ${date} ${month} ${year}`;}
  
  //COLOR THEME SWITCH 
  function setTheme(themeName) {
      localStorage.setItem('theme', themeName);
      document.documentElement.className = themeName;
    }
    
    function toggleTheme() {
      if (localStorage.getItem('theme') === 'theme-light') {
          setTheme('theme-dark');
        } else {
          setTheme('theme-light');
        }
      }
      
      function toggleTheme() {
        if (localStorage.getItem('theme') === 'theme-dark') {
          setTheme('theme-light');
        } else {
          setTheme('theme-dark');
        }
      }
      
      (function () {
        if (localStorage.getItem('theme') === 'theme-dark') {
          setTheme('theme-dark');
          document.getElementById('slider').checked = false;
        } else {
          setTheme('theme-light');
          document.getElementById('slider').checked = true;
        }
      })();
      
      // // CHECK IF BROWSER SUPPORTS GEOLOCATION
      // if('geolocation' in navigator){
      //   navigator.geolocation.getCurrentPosition(setPosition, showError);
      // }else{
      //   notificationElement.style.display = "block";
      //   notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
      // }
      // // SET USER'S POSITION
      // function setPosition(position){
      //   let latitude = position.coords.latitude;
      //   let longitude = position.coords.longitude;
      //   getWeather(latitude, longitude);
      // }
      
      // // SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
      // function showError(error){
      //   notificationElement.style.display = "block";
      //   notificationElement.innerHTML = `<p> ${error.message} </p>`;
      // }