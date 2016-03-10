"use strict";

let Cinema = require('../models/cinema.js');
let GoogleService = require('../services/google-service.js');

class CinemaInfoController {
	constructor(){
		this.googleService = new GoogleService();
	}

	saveCinemasInfo(brandName){
		return this.googleService.getCinemasByBrand(brandName)
		.then(cinemaList => {
			for(let cinema of cinemaList){
				this.getCinemaDetails(cinema.place_id)
				.then(cinema => {
					if (cinema !== undefined){
						cinema.save();
					}
				})
			}
		})
		.catch(error => {
			console.error(error);
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
					},
					placeId: cinemaId
				});
			}
			return cinema;
		})
		.catch(error => {
			console.error(error);
		});
	}
}

module.exports = CinemaInfoController;