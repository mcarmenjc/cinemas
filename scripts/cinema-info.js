"use strict";

let GoogleService = require('./services/google-service.js');

let googleService = new GoogleService();
googleService.getCinemasByBrand('odeon')
.then(odeonCinemas => {
	console.log(odeonCinemas.length);
});

googleService.getCinemasByBrand('picturehouse')
.then(picturehouse => {
	console.log(picturehouse.length);
});

googleService.getCinemasByBrand('cineworld')
.then(cineworld => {
	console.log(cineworld.length);
});