"use strict";

let request = require('./request-service.js');

class GoogleService {
	constructor(){
		this.baseUrl = 'https://maps.googleapis.com/maps/api/place/';
		this.type = 'movie_theater';
		this.radius = '50000';
		this.key = 'AIzaSyB_bVENhpQBDH3N_G5iNMlV0PLs9Tj20u4';
	}

	getCinemasByBrand(cityLocation, brand){
		let url = this.getNearbyUrl(cityLocation, brand);
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

	getNearbyUrl(cityLocation, name){
		let url = this.baseUrl + 'nearbysearch/json?';
		url = url + 'location=' + encodeURI(cityLocation.lat + ',' + cityLocation.lng) + '&';
		url = url + 'radius=' + encodeURI(this.radius) + '&';
		url = url + 'type=' + encodeURI(this.type) + '&';
		url = url + 'key=' + encodeURI(this.key) + '&';
		url = url + 'name=' + encodeURI(name);
		return url;
	}

	getDetails(placeId){
		let url = this.getDetailsUrl(placeId);
		return request.get(url)
		.then(resultJSON => {
			let result = JSON.parse(resultJSON);
			return result.result;
		})
		.catch(error => {
			console.error(error);
		})
	}

	getDetailsUrl(placeId){
		let url = this.baseUrl + 'details/json?';
		url = url + 'key=' + this.key + '&';
		url = url + 'placeid=' + placeId;
		return url;
	}
}

module.exports = GoogleService;