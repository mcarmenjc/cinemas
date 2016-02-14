"use strict";

let CinemaScheduleController = require('./cinema-schedule-controller.js');
let requestp = require('../helpers/requestp.js');
let cheerio = require('cheerio');
let Film = require('../models/film.js');

class OdeonScheduleController extends CinemaScheduleController {
	getSchedule(){
		console.log('odeon getSchedule');
		requestp(this.cinema.url).then(body => {
			let $ = cheerio.load(body);
			let me = this;
			$('.film-detail.WEEK').each(function(){
				let film = me.getFilmInfo(this, $);
				me.cinema.addFilm(film);
			});
			console.log(this.cinema.films.length);
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
			month = this.getMonthNumber(splitDate[2]),
			day = +splitDate[1];
		return new Date(2016, month, day);
	}


	getMonthNumber(monthString){
		let monthNumber;
		switch(monthString.toUpperCase()){
			case 'JAN':
				monthNumber = 0;
				break;
			case 'FEB':
				monthNumber = 1;
				break;
			case 'MAR':
				monthNumber = 2;
				break;
			case 'APR':
				monthNumber = 3;
				break;
			case 'MAY':
				monthNumber = 4;
				break;
			case 'JUN':
				monthNumber = 5;
				break;
			case 'JUL':
				monthNumber = 6;
				break;
			case 'AUG':
				monthNumber = 7;
				break;
			case 'SEP':
				monthNumber = 8;
				break;
			case 'OCT':
				monthNumber = 9;
				break;
			case 'NOV':
				monthNumber = 10;
				break;
			case 'DEC':
				monthNumber = 11;
				break;
			default:
				monthNumber = -1;
				break;
		}
		return monthNumber;
	}

}

module.exports = OdeonScheduleController;