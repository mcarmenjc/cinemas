"use strict";

let CinemaScheduleController = require('./cinema-schedule-controller.js');
let requestp = require('../helpers/requestp.js');
let cheerio = require('cheerio');
let Film = require('../models/film.js');

class PlayhouseScheduleController extends CinemaScheduleController {
	getSchedule(){
		return requestp(this.cinema.url + '/Whats_On').then(body => {
			let $ = cheerio.load(body);
			let me = this;
			let currentDay = undefined;
			$('ul.whats-on').find('li').each(function(){
				if ($(this).hasClass('heading dark')){
					currentDay = me.getDate($(this).text());
				}
				else {
					let name = this.getFilName(listElement, $),
						times = me.getFilmTimes(listElement, $),
						film;
					if (times.length === 0){
						//look for film in cinema film array
						//if exists, append new day and times
						//if not create a new film, add day and times and push it to the cinema films array
					}
				}
			});
			return this.cinema;
		}).catch(error => {console.log(error)});
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

module.exports = PlayhouseScheduleController;