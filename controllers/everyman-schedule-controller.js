"use strict";

let CinemaScheduleController = require('./cinema-schedule-controller.js');

class EverymanScheduleController extends CinemaScheduleController {
	getSchedule(){
		console.log('everyman getSchedule');
	}
}

module.exports = EverymanScheduleController;