//API key details
const api = {
	key: '',
	base: 'https://api.openweathermap.org/data/2.5/',
};

const searchBox = document.querySelector('.search-box');
const searchCity = document.querySelector('.city');
const searchDate = document.querySelector('.date');
const searchTemp = document.querySelector('.temp');
const searchWeather = document.querySelector('.weather');
const searchHiLow = document.querySelector('.hi-low');
const addCard = document.querySelector('.hidden');

function getQuery(e) {
	if (e.keyCode == 13) {
		fetch(
			`${api.base}weather?q=` +
				searchBox.value +
				`&units=metric&appid=${api.key}`
		)
			.then((response) => response.json())
			.then(dataDisplay);
	}
}

function dataDisplay(response) {
	console.log(response);
	if (response.cod === '404') {
		addCard.classList.add('card');

		searchCity.innerText = 'Invalid City';

		searchTemp.innerText = 'N/A';

		searchWeather.innerText = 'N/A';

		searchHiLow.innerText = 'N/A' + '/' + 'N/A';
	} else {
		addCard.classList.add('card');

		searchCity.innerText = response['name'] + ',' + response['sys']['country'];

		searchTemp.innerText =
			response['main']['temp'] + String.fromCharCode(176) + 'c';

		searchWeather.innerText = response.weather[0].main;

		searchHiLow.innerText =
			response.main.temp_max +
			String.fromCharCode(176) +
			'c' +
			'/' +
			response.main.temp_min +
			String.fromCharCode(176) +
			'c';
	}
}

searchBox.addEventListener('keypress', getQuery);
