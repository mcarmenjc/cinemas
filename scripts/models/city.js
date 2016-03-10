"use strict";

class City {
	constructor(data){
		this.name = data.name || '';
		this.location = data.location || {};
		this.cinemaBrands = data.cinemaBrands || [];
	}
}

module.exports = Cinema;