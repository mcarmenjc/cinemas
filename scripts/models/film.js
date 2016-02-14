"use strict";

class Film {
	constructor(name){
		this.name = name;
		this.schedule = [];
	}

	addSchedule(day, times){
		this.schedule.push({
			day: day,
			times: times
		});
	}
}

module.exports = Film;