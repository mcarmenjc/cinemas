"use strict";

let CinemaScheduleController = require('./cinema-schedule-controller.js');
let requestp = require('../helpers/requestp.js');
let cheerio = require('cheerio');
let Film = require('../models/film.js');

class CineworldScheduleController extends CinemaScheduleController {
	getSchedule(){
		return requestp(this.cinema.url).then(body => {
			let $ = cheerio.load(body);
			let me = this;
			console.log(body);
			console.log($('#whatsOnList').children().length);
			return this.cinema;
		}).catch(error => {console.log(error)});
	}
}

module.exports = CineworldScheduleController;