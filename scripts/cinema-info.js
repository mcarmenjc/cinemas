"use strict";

let CityController = require('./controllers/city-controller.js');
let CinemaInfoController = require('./controllers/cinema-info-controller.js');

let cinemaInfoController = new CinemaInfoController();
let cityController = new CityController();
cityController.getAllCities().then(cities => {
	for(let city of cities){
		console.log('Get cinemas info for ' + city.name);
		console.log(city);
		for(let brand of city.cinemaBrands) {
			console.log('Get cinemas info for brand ' + brand);
			cinemaInfoController.saveCinemasInfo(city.location, brand);
		}
	}
});