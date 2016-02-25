"use strict";

let request = require('./request-service.js');

class GoogleService {
	constructor(){
		this.baseUrl = 'https://maps.googleapis.com/maps/api/place/';
		this.parameters = {
			location: '51.528308,-0.3817814',
			radius: '50000',
			type: 'movie_theater',
			key: 'AIzaSyB_bVENhpQBDH3N_G5iNMlV0PLs9Tj20u4'
		};
	}

	getCinemasByBrand(brand){
		let url = this.getNearbyUrl(brand);
		return request.get(url)
		.then(resultJSON => {
			let result = JSON.parse(resultJSON);
			if (result.status === 'OK'){
				return result.results;
			}
			return [];
		})
		.catch(error => {
			console.error(error);
		})
	}

	getNearbyUrl(name){
		let url = this.baseUrl + 'nearbysearch/json?';
		for(let key in this.parameters){
			url = url + key + '=' + this.parameters[key] + '&';
		}
		url = url + 'name=' + name;
		return url;
	}
}

module.exports = GoogleService;