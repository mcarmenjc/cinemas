"use strict";

let CinemaScheduleController = require('./cinema-schedule-controller.js');

class PlayhouseScheduleController extends CinemaScheduleController {
	getSchedule(){
		console.log('playhouse getSchedule');
	}
}

module.exports = PlayhouseScheduleController;