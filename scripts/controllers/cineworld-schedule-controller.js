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
			console.log(siteId);
			return siteId;
		})
		.then(siteId => {
			let films = this.getFilmsFromSiteId(siteId);
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
			};
		request.post(url, params)
		.then(filmInfo => {
			let $ = cheerio.load(filmInfo);
			$('div.mix.col-xs-12').each(function(){
				let dataFeat = $(this).attr('data-feat'),
					filmData = JSON.parse(dataFeat);
				console.log(filmData.n);
				console.log(filmData.BD[0].date);
				console.log(filmData.BD[0].P);
			});
		})
		.catch(error => {
			console.log(error);
		});
	}
}

module.exports = CineworldScheduleController;