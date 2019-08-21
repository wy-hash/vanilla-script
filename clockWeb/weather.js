const weather = document.querySelector('.js-weather');
const API_KEY = 'd77384279d021b0c5d0b3253f8bc6434';
//api.openweathermap.org/data/2.5/weather?lat=35&lon=139
const COORDS = 'coords';

function getWeather(lat, lng){
  fetch(//가져올 데이터를 얻기위해 사용
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&unit=metric`
    ).then(function(response){
      return response.json();
    }).then(function(json){
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });

}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude ,
    longitude  
  };
  saveCoords(coordsObj);
}

function handleGeoError(){
  console.log('NO Weather');
}

function askForCoords(){
  //현재 좌표값
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null){
    askForCoords();
  } else {
    // getWeather
    const parseCoords = JSON.parse(loadedCoords);
    console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();