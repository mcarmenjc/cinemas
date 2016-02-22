"use strict";

let OdeonScheduleController = require('./controllers/odeon-schedule-controller.js');
let PicturehouseScheduleController = require('./controllers/picturehouse-schedule-controller.js');

/*let odeonScheduleController = new OdeonScheduleController('bfi bfi_imax', 'http://www.odeon.co.uk/cinemas/bfi_imax/211/');
odeonScheduleController.getSchedule().then(cinema => {
	console.log(cinema.name);
	for (let film of cinema.films){
		console.log(film.name);
	}
});*/

let picturehouseScheduleController = new PicturehouseScheduleController('the ritzy', 'http://www.picturehouses.com/cinema/Ritzy_Picturehouse');
picturehouseScheduleController.getSchedule().then(cinema => {
	console.log(cinema.name);
	for (let film of cinema.films){
		console.log(film.name);
		console.log(film.schedule.length);
	}
});