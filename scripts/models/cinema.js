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
}

module.exports = Cinema;