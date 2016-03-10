"use strict";
let dbService = require('../services/mongodb-service.js');

class Cinema {
	constructor(data){
		this.name = data.name || '';
		this.address = data.address || '';
		this.phoneNumber = data.phoneNumber || '';
		this.googlePlaceId = data.googlePlaceId || '';
		this.website = data.website || '';
		this.location = data.location || {};
		this.films = [];
	}

	addFilm(film){
		this.films.push(film);
	}

	getFilm(filmName){
		for (let film of this.films){
			if (film.name.toUpperCase() === filmName.toUpperCase()){
				return film;
			}
		}
		return undefined;
	}

	save(){
		let cinemaData = {
			name: this.name,
			address: this.address,
			phoneNumber: this.phoneNumber,
			googlePlaceId: this.googlePlaceId,
			website: this.website,
			location: this.location,
		};
		dbService.insertDocument('cinemas', cinemaData);
	}
}

module.exports = Cinema;