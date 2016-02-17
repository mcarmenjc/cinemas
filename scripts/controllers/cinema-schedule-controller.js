"use strict";

let Cinema = require ('../models/cinema.js')

class CinemaScheduleController {
	constructor(name, url){
		this.cinema = new Cinema(name, url);
	}

	getSchedule(){
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

module.exports = CinemaScheduleController;