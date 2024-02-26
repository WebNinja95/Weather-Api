let input = document.querySelector('.input_text');
let main = document.querySelector('.name-area');
let template = document.querySelector('.template');
let temp = document.querySelector('.temp');
let desc = document.querySelector('.desc');
let icon = document.querySelector('.weather-icon'); 
let button = document.querySelector('.submit');
let add = document.querySelector('.center-container');
let Favorite = document.querySelector('.Favorite');
let tempo = document.querySelector('.tempo');
let favoritesList = document.querySelector('.favorites');
let home = document.querySelector('.home');

Favorite.addEventListener('click',()=>{
  tempo.classList.add('d-none')
  favoritesList.classList.remove('d-none')
  renderFavorites(); 
})
home.addEventListener('click',()=>{
  tempo.classList.remove('d-none')
  favoritesList.classList.add('d-none')
})

button.addEventListener('click', function(name) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=573984769d519688c6e5b3b71977eb68')
        .then(response => response.json())
        .then(data => {
            
            let tempValue = data['main']['temp'];
            let nameValue = data['name'];
            let descValue = data['weather'][0]['description'];
            let iconCode = data['weather'][0]['icon']; 
          
            // Convert temperature to Celsius
            let tempCelsius = tempValue - 273.15 ;
            temp.innerHTML = tempCelsius.toFixed(0) +'&deg;C' ; 
            main.innerHTML = nameValue;
            desc.innerHTML = descValue;

            // Call function to set weather icon
            setWeatherIcon(iconCode);
            template.classList.remove('d-none')
            add.classList.remove('d-none')
            input.value = "";
        })
        .catch(err => alert("Wrong city name!"));
})

// Function to set weather icon based on icon code
function setWeatherIcon(iconCode) {
  switch (iconCode) {
      case '01d':
          icon.className = 'fas fa-sun weather-icon'; 
          icon.style.color = '#cdeaed'; 
          break;
      case '01n':
          icon.className = 'fas fa-moon weather-icon';
          icon.style.color = '#cdeaed'; 
          break;
      case '02d':
      case '02n':
          icon.className = 'fas fa-cloud-sun weather-icon'; 
          icon.style.color = '#cdeaed'; 
          break;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
          icon.className = 'fas fa-cloud weather-icon'; 
          icon.style.color = '#cdeaed'; 
          break;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
          icon.className = 'fas fa-cloud-showers-heavy weather-icon'; 
          icon.style.color = '#cdeaed'; 
          break;
      case '11d':
      case '11n':
          icon.className = 'fas fa-poo-storm weather-icon';
          icon.style.color = '#cdeaed'; 
          break;
      case '13d':
      case '13n':
          icon.className = 'fas fa-snowflake weather-icon'; 
          icon.style.color = '#cdeaed'; 
          break;
      case '50d':
      case '50n':
          icon.className = 'fas fa-smog weather-icon'; 
          icon.style.color = '#cdeaedy'; 
          break;
      default:
          icon.className = 'fas fa-question-circle weather-icon'; 
          icon.style.color = '#cdeaed'; 
          break;
  }
}

let favorites = [];


add.addEventListener('click', function() {
  const isFavorite = favorites.some(favorite => favorite.name === main.innerHTML);
  if (!isFavorite) {
    favorites.push({
      name: main.innerHTML,
      temperature: temp.innerHTML,
      description: desc.innerHTML,
      icon: icon.className
    });
    renderFavorites();
    showNotification('Added to Favorites!');
  } else {
    alert("This city is already in favorites!");
  }
});


function renderFavorites() {
  favoritesList.innerHTML = '';
  favorites.forEach(favorite => {
    const favoriteElement = document.createElement('div');
    favoriteElement.classList.add('weather');
    favoriteElement.innerHTML = `
      <h2 class="temp" >${favorite.temperature}</h2>
      <p class="name-area">${favorite.name}</p>
      <p class="desc">${favorite.description}</p>
      <i class="${favorite.icon}"></i> 
      <div class="img-div">
        <img src="images/card.png" alt="">
      </div>
    `;
    favoritesList.appendChild(favoriteElement);
  });
}
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');

  setTimeout(() => {
      notification.classList.remove('show');
  }, 3000); 
}
