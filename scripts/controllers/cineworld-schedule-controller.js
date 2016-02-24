"use strict";

let CinemaScheduleController = require('./cinema-schedule-controller.js'),
	request = require('../services/request-service.js'),
	cheerio = require('cheerio'),
	Film = require('../models/film.js'),
	Cinema = require('../models/cinema.js');

class CineworldScheduleController extends CinemaScheduleController {
	getSchedule(cinemaName, cinemaUrl){
		let cinema = new Cinema(cinemaName, cinemaUrl);
		return request.get(cinema.url).then(body => {
			let $ = cheerio.load(body),
				siteId = this.getSiteId($);
			return siteId;
		})
		.then(siteId => {
			return this.getFilmsFromSiteId(siteId)
			.then(films => {
				cinema.films = films;
				return cinema;
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	getSiteId($){
		let siteId = -1,
			regex = /.*var siteId = (\d+);.*/gmi;
		$('script').each(function(){
			let scriptText = $(this).text(),
				regexResult = regex.exec(scriptText);
			if(regexResult !== null){
				siteId = regexResult[1];
			}
		});
		return siteId;
	}

	getFilmsFromSiteId(siteId){
		let url = 'https://www1.cineworld.co.uk/pgm-list-byfeat',
			params = {
				si: siteId,
				sort: 'cin',
				max: 365,
				css: 'cat-',
				mod: 'cinemapage_movie_list',
				attrs: '2D,3D,DBOX,4DX,M4J'
			},
			films = [];
		return request.post(url, params)
		.then(filmInfo => {
			let $ = cheerio.load(filmInfo),
				me = this;
			$('div.mix.col-xs-12').each(function(){
				let dataFeat = $(this).attr('data-feat'),
					filmData = JSON.parse(dataFeat),
					film = me.getFilmInfo(filmData);
				films.push(film);
			});
			return films;
		})
		.catch(error => {
			console.log(error);
		});
	}

	getFilmInfo(filmData){
		let film = new Film(filmData.n);
		for (let date of filmData.BD){
			let day = new Date(date.date),
				times = [];
			for (let time of date.P){
				times.push(time.time);
			}
			film.addSchedule(day, times);
		}
		return film;
	}
}

module.exports = CineworldScheduleController;