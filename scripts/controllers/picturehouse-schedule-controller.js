"use strict";

let CinemaScheduleController = require('./cinema-schedule-controller.js');
let request = require('../services/request-service.js');
let cheerio = require('cheerio');
let Film = require('../models/film.js');

class PicturehouseScheduleController extends CinemaScheduleController {
	getSchedule(){
		return request.get(this.cinema.url + '/Whats_On')
		.then(body => {
			let $ = cheerio.load(body);
			let me = this;
			let currentDay = undefined;
			console.log(body);
			return this.cinema;
		})
		.catch(error => {
			console.log('error');
			console.log(error);
		});
	}

	getDate(dateText){
		let regex = /\w+\s+(\d+)\w+\s(\w+)/gmi,
			splitDate = regex.exec(dateText),
			month = super.getMonthNumber(splitDate[2]),
			day = +splitDate[1];
		return new Date(2016, month, day);
	}

	getFilmTimes(listElement, $){
		let times=[];
		$(listElement).find('dl.film-times').find('a.btn.btn-xs.btn-default.btn-special').each(function(){
			times.push($(this).text());
		});
		return times;
	}

	getFilName(listElement, $){
		return $(listElement).find('h2').text()	
	}
}

module.exports = PicturehouseScheduleController;