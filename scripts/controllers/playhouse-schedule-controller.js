"use strict";

let CinemaScheduleController = require('./cinema-schedule-controller.js');
let requestp = require('../helpers/requestp.js');
let cheerio = require('cheerio');
let Film = require('../models/film.js');

class PlayhouseScheduleController extends CinemaScheduleController {
	getSchedule(){
		return requestp(this.cinema.url).then(body => {
			let $ = cheerio.load(body);
			console.log(body);
			let me = this;
			$('#this-week').each(function(){
				console.log(this.text());
			});
			return this.cinema;
		}).catch(error => {console.log(error)});
	}
}

module.exports = PlayhouseScheduleController;