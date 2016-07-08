"use strict";

class Cinema {
	constructor(name, url){
		this.name = name;
		this.url = url;
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
}

module.exports = Cinema;