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
		let cinemaPlaces = [];
		return this.nearBySearch(url)
		.then(result => {
			return this.processResult(result, cinemaPlaces, url);
		})
		.then(result => {
			return this.processResult(result, cinemaPlaces, url);
		})
		.then(result => {
			if (result !== undefined && result.status === 'OK'){
				Array.prototype.push.apply(cinemaPlaces, result.results);
			}
			return cinemaPlaces;
		})
		.catch(error => {
			console.error(error);
		})
	}

	processResult(result, cinemas, url){
		if (result !== undefined && result.status === 'OK'){
			Array.prototype.push.apply(cinemas, result.results);
			if (result.next_page_token !== undefined){
				return this.nextNearBySearch(result.next_page_token, url);
			}
		}
		return undefined;
	}

	nextNearBySearch(nextPageToken, url){
		let nextPageUrl = url + '&pagetoken=' + encodeURI(nextPageToken),
			timeoutPromise = new Promise(function(resolve, reject){
				setTimeout(function(){
					resolve();
				}, 10000);
			});
		return timeoutPromise.then(() => {
					return this.nearBySearch(nextPageUrl);	
				});
	}

	nearBySearch(url){
		return request.get(url)
		.then(resultJSON => {
			let result = JSON.parse(resultJSON);
			return result;
		})
		.catch(error => {
			console.error(error);
		});
	}

	getNearbyUrl(name){
		let url = this.baseUrl + 'nearbysearch/json?';
		for(let key in this.parameters){
			url = url + key + '=' + encodeURI(this.parameters[key]) + '&';
		}
		url = url + 'name=' + name;
		return url;
	}
}

module.exports = GoogleService;