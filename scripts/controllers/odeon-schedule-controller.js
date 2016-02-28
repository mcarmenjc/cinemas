"use strict";

let CinemaScheduleController = require('./cinema-schedule-controller.js'),
	request = require('../services/request-service.js'),
	cheerio = require('cheerio'),
	Film = require('../models/film.js'),
	Cinema = require('../models/cinema.js');

class OdeonScheduleController extends CinemaScheduleController {
	getSchedule(cinemaName, cinemaUrl){
		let cinema = new Cinema(cinemaName, cinemaUrl);
		return request.get(cinema.website).then(body => {
			let $ = cheerio.load(body);
			let me = this;
			$('.film-detail.WEEK').each(function(){
				let film = me.getFilmInfo(this, $);
				cinema.addFilm(film);
			});
			return cinema;
		}).catch(error => {console.log(error)});
	}

	getFilmInfo(filmElement, $){
		let name = this.getFilmName(filmElement, $),
			film = new Film(name),
			me = this;
		$(filmElement).find('div.times.containerWEEK').each(function(){
			let day = me.getDate($(this).find('div.presentation-info.week').text()),
				times = [];
			$(this).find('li a').each(function(){
				times.push($(this).text());
			});
			film.addSchedule(day, times);
		});
		
		return film;
	}

	getFilmName(filmElement, $){
		return $(filmElement).find('div.presentation-info h4').text()
	}

	getDate(dateText){
		let regex = /[A-Za-z]+(\d+)\s(\w+)/gmi,
			splitDate = regex.exec(dateText),
			month = super.getMonthNumber(splitDate[2]),
			day = +splitDate[1];
		return new Date(2016, month, day);
	}
}

module.exports = OdeonScheduleController;