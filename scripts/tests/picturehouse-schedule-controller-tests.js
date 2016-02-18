"use strict";

let PicturehouseScheduleController = require('../controllers/picturehouse-schedule-controller.js'),
	chai = require('chai'),
	sinon = require('sinon'),
	cheerio = require('cheerio'),
	request = require('request'),
	filesystemp = require('../helpers/filesystemp.js'),
	expect = chai.expect;

describe('PicturehouseScheduleController', function(){
	let scheduleController;

	before(function(done){
		scheduleController = new PicturehouseScheduleController('the ritzy', 'http://www.picturehouses.com/cinema/Ritzy_Picturehouse');
		filesystemp.readFile('./data/picturehouse.html')
				   .then(function(htmlContent){
				   		sinon.stub(request, 'get')
			 				 .yields(null, {statusCode: 200}, htmlContent);
			 			done();
				   });
	});

	after(function(done){
    	request.get.restore();
    	done();
	});

	it('should get all films in the page', function(){
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films).to.have.length(2);
		});
	});
});