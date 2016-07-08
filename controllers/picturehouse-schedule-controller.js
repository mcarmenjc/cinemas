"use strict";

let CinemaScheduleController = require('./cinema-schedule-controller.js'),
	request = require('../services/request-service.js'),
	cheerio = require('cheerio'),
	Film = require('../models/film.js'),
	Cinema = require('../models/cinema.js');

class PicturehouseScheduleController extends CinemaScheduleController {
	getSchedule(cinemaName, cinemaUrl){
		let cinema = new Cinema(cinemaName, cinemaUrl);
		return request.get(cinema.url + '/Whats_On')
		.then(body => {
			let $ = cheerio.load(body);
			let me = this;
			let currentDay = undefined;
			$('ul.whats-on').find('li').each(function(){
				if ($(this).hasClass('heading dark')){
					currentDay = me.getDate($(this).text());
				}
				else {
					let name = me.getFilmName(this, $),
						times = me.getFilmTimes(this, $),
						film;
					if (times.length > 0){
						film = cinema.getFilm(name);
						if (film === undefined){
							film = new Film(name);
							cinema.addFilm(film);
						}
						film.addSchedule(currentDay, times);
					}
				}
			});
			return cinema;
		})
		.catch(error => {
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
		$(listElement).find('dl.film-times').find('a.btn.btn-xs').each(function(){
			times.push($(this).text().replace('.', ':'));
		});
		return times;
	}

	getFilmName(listElement, $){
		let regex = /(.*)\s+\[.*\]/gmi,
			filmWebText = $(listElement).find('h2').text(),
			splitFilmName = regex.exec(filmWebText),
			filmName = splitFilmName[1];
		return filmName;	
	}
}

module.exports = PicturehouseScheduleController;