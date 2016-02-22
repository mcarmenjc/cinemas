"use strict";

let PicturehouseScheduleController = require('../controllers/picturehouse-schedule-controller.js'),
	chai = require('chai'),
	sinon = require('sinon'),
	request = require('../services/request-service.js'),
	fs = require('fs'),
	expect = chai.expect;

describe('PicturehouseScheduleController', function(){
	let scheduleController;
	function mockGetRequest (){
		let file = './data/picturehouse.html',
			content = fs.readFileSync(file, 'utf8');
		return new Promise(function(resolve, reject){
			resolve(content);
		});
	}

	before(function(done){
		let stub = sinon.stub(request, "get", mockGetRequest);
		scheduleController = new PicturehouseScheduleController('the ritzy', 'http://www.picturehouses.com/cinema/Ritzy_Picturehouse');
		done();
	});

	after(function(done){
    	done();
	});

	it('should get all films in the page', function(){
		scheduleController.getSchedule().then(cinema => {
			console.log(cinema.name);
			for (let film of cinema.films){
				console.log(film.name);
			}
		});
	});
});