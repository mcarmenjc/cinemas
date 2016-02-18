"use strict";

let OdeonScheduleController = require('../controllers/odeon-schedule-controller.js'),
	chai = require('chai'),
	sinon = require('sinon'),
	cheerio = require('cheerio'),
	request = require('request'),
	filesystemp = require('../helpers/filesystemp.js'),
	expect = chai.expect;

describe('OdeonScheduleController', function(){
	let scheduleController;

	before(function(done){
		scheduleController = new OdeonScheduleController('BFI IMAX', 'http://www.odeon.co.uk/cinemas/bfi_imax/211/');
		filesystemp.readFile('./data/odeon.html')
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


	it('should get film name correctly', function(){
		let expectedName = 'America Wild: National Parks Adventure';
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films[0].name).to.equal(expectedName);
		});
	});

	it('should get all the days a film is screening', function(){
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films[0].schedule).to.have.length(4);
		});
	});

	it('should get film screening day correctly', function(){
		let expectedDay = 12,
			expectedMonth = 1;
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films[0].schedule[0].day.getDate()).to.equal(expectedDay);
			expect(cinema.films[0].schedule[0].day.getMonth()).to.equal(expectedMonth);
		});
	});

	it('should get film screening time for a day', function(){
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films[0].schedule[0].times).to.have.length(1);
		});
	});

	it('should get all film screening times for a day', function(){
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films[1].schedule[1].times).to.have.length(3);
		});
	});

	it('should get film screening time correctly', function(){
		let	expectedTime = '11:45';
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films[0].schedule[0].times[0]).to.equal(expectedTime);
		});
	});
});