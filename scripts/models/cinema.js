"use strict";

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

	save(){}
}

module.exports = Cinema;