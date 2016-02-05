module.exports = function(){
	var request = require('request');
	var cheerio = require('cheerio');

	function getMonthNumber(monthString){
		var monthNumber;
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
	};

	function getDate(dateText){
		var regex = /[A-Za-z]+(\d+)\s(\w+)/gmi,
			splitDate = regex.exec(dateText),
			month = getMonthNumber(splitDate[2]),
			day = +splitDate[1];
		return new Date(2016, month, day);
	};

	function getFilmSchedule(filmElement){
		var filmSchedule = [];
		$(filmElement).find('div.times.containerWEEK').each(function(){
			var daySchedule = {};
			daySchedule.day = getDate($(this).find('div.presentation-info.week').text());
			daySchedule.times = [];
			$(this).find('li a').each(function(){
				daySchedule.times.push($(this).text());
			});
			filmSchedule.push(daySchedule);
		});
		return filmSchedule;
	};

	function getFilmName(filmElement){
		return $(filmElement).find('div.presentation-info h4').text()
	};

	function getFilmInfo(filmElement){
		var filmInfo = {};
		filmInfo.name = getFilmName(filmElement);
		filmInfo.schedule = getFilmSchedule(filmElement);
		return filmInfo;
	};

	function getSchedule($){
		var films = [];
		$('.film-detail.WEEK').each(function(){
			var filmInfo = getFilmInfo(this);
			films.push(filmInfo);
		});
		return films;
	};

	return {
		getSchedule: getSchedule
	};
};