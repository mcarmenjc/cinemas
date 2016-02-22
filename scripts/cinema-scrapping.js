"use strict";

let OdeonScheduleController = require('./controllers/odeon-schedule-controller.js');
let PicturehouseScheduleController = require('./controllers/picturehouse-schedule-controller.js');

let odeonScheduleController = new OdeonScheduleController();
odeonScheduleController.getSchedule('bfi bfi_imax', 'http://www.odeon.co.uk/cinemas/bfi_imax/211/').then(cinema => {
	console.log(cinema.name);
	for (let film of cinema.films){
		console.log(film.name);
	}
});

let picturehouseScheduleController = new PicturehouseScheduleController();
picturehouseScheduleController.getSchedule('the ritzy', 'http://www.picturehouses.com/cinema/Ritzy_Picturehouse').then(cinema => {
	console.log(cinema.name);
	for (let film of cinema.films){
		console.log(film.name);
	}
});