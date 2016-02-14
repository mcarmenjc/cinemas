"use strict";

let Cinema = require ('../models/cinema.js')

class CinemaScheduleController {
	constructor(name, url){
		this.cinema = new Cinema(name, url);
	}

	getSchedule(){
	}
}

module.exports = CinemaScheduleController;