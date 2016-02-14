"use strict";

let CinemaScheduleController = require('./cinema-schedule-controller.js');

class CineworldScheduleController extends CinemaScheduleController {
	getSchedule(){
		console.log('cineworld getSchedule');
	}
}

module.exports = CineworldScheduleController;