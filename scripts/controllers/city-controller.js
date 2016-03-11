"use strict";

let City = require('../models/city.js');
let dbService = require('../services/mongodb-service.js');

class CityController {
	constructor(){
	}

	getAllCities(){
		return dbService.queryAll('cities');
	}
}

module.exports = CityController;