"use strict";

let Cinema = require('../models/cinema.js');
let GoogleService = require('../services/google-service.js');

class CinemaInfoController {
	constructor(){
		this.googleService = new GoogleService();
	}

	saveCinemasInfo(cityLocation, brandName){
		console.log(brandName + ' -- getting cinemas from google');
		return this.googleService.getCinemasByBrand(cityLocation, brandName)
		.then(cinemaList => {
			console.log(brandName + ' -- number of cinemas get ' + cinemaList.length);
			for(let cinema of cinemaList){
				console.log(brandName + ' -- ' + cinema.place_id + ' -- getting details from google';
				this.getCinemaDetails(cinema.place_id)
				.then(cinema => {
					console.log(brandName + ' -- ' + cinema.place_id + ' -- got details from google';
					if (cinema !== undefined){
						console.log(brandName + ' -- ' + cinema.place_id + ' -- saving info';
						cinema.save();
					}
				});
			}
		});
	}

	getCinemaDetails(cinemaId){
		return this.googleService.getDetails(cinemaId)
		.then(cinemaDetails => {
			let cinema = undefined;
			if (cinemaDetails !== {}){
				cinema = new Cinema({
					address: cinemaDetails.formatted_address,
					phoneNumber: cinemaDetails.international_phone_number,
					name: cinemaDetails.name,
					googlePlaceId: cinemaDetails.place_id,
					website: cinemaDetails.website,
					location: {
						lat: cinemaDetails.geometry.location.lat,
						lng: cinemaDetails.geometry.location.lng
					}
				});
			}
			return cinema;
		});
	}
}

module.exports = CinemaInfoController;