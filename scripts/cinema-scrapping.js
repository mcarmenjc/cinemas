"use strict";

let OdeonScheduleController = require('./controllers/odeon-schedule-controller.js');
let CineworldScheduleController = require('./controllers/cineworld-schedule-controller.js');
let PlayhouseScheduleController = require('./controllers/playhouse-schedule-controller.js');

let odeonScheduleController = new OdeonScheduleController('bfi bfi_imax', 'http://www.odeon.co.uk/cinemas/bfi_imax/211/');
odeonScheduleController.getSchedule().then(cinema => {
	console.log(cinema.name);
	for (let film of cinema.films){
		console.log(film.name);
	}
});

// let cineworldScheduleController = new CineworldScheduleController('the o2', 'http://www.cineworld.co.uk/cinemas/london-the-o2-greenwich');
// cineworldScheduleController.getSchedule();

let palyhouseScheduleController = new PlayhouseScheduleController('the ritzy', 'http://www.picturehouses.com/cinema/Ritzy_Picturehouse');
palyhouseScheduleController.getSchedule().then(cinema => {
	console.log(cinema.name);
	for (let film of cinema.films){
		console.log(film.name);
	}
});