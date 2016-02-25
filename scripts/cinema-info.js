"use strict";

let GoogleService = require('./services/google-service.js');

let googleService = new GoogleService();
googleService.getCinemasByBrand('odeon')
.then(odeonCinemas => {
	console.log(odeonCinemas.length);
	console.log(odeonCinemas[0]);
});