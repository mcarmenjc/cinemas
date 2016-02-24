"use strict";

let CineworldScheduleController = require('../controllers/cineworld-schedule-controller.js'),
	chai = require('chai'),
	sinon = require('sinon'),
	request = require('../services/request-service.js'),
	fs = require('fs'),
	expect = chai.expect;

describe('CineworldScheduleController', function(){
	let scheduleController;
	function mockGetRequest (){
		let file = './data/cineworld.html',
			content = fs.readFileSync(file, 'utf8');
		return new Promise(function(resolve, reject){
			resolve(content);
		});
	}

	function mockPostRequest (){
		let file = './data/cineworld-response.html',
			content = fs.readFileSync(file, 'utf8');
		return new Promise(function(resolve, reject){
			resolve(content);
		});
	}

	before(function(done){
		sinon.stub(request, "get", mockGetRequest);
		sinon.stub(request, "post", mockPostRequest);
		done();
	});

	beforeEach(function(){
		scheduleController = new CineworldScheduleController();
	});

	after(function(done){
		request.get.restore();
		request.post.restore();
    	done();
	});

	it('should get all films in the page', function(done){
		scheduleController.getSchedule('THE O2', 'https://www1.cineworld.co.uk/cinemas/london-the-o2-greenwich')
		.then(cinema => {
			expect(cinema.films).to.have.length(23);
			done();
		});
	});

	it('should get film name correctly', function(done){
		let expectedName = 'Deadpool';
		scheduleController.getSchedule('THE O2', 'https://www1.cineworld.co.uk/cinemas/london-the-o2-greenwich')
		.then(cinema => {
			expect(cinema.films[0].name).to.equal(expectedName);
			done();
		});
	});

	it('should get all film screening dates', function(done){
		scheduleController.getSchedule('THE O2', 'https://www1.cineworld.co.uk/cinemas/london-the-o2-greenwich')
		.then(cinema => {
			expect(cinema.films[0].schedule).to.have.length(8);
			done();
		});
	});

	it('should get film screening day correctly', function(done){
		let expectedDay = 18,
			expectedMonth = 1;
		scheduleController.getSchedule('THE O2', 'https://www1.cineworld.co.uk/cinemas/london-the-o2-greenwich')
		.then(cinema => {
			expect(cinema.films[0].schedule[0].day.getDate()).to.equal(expectedDay);
			expect(cinema.films[0].schedule[0].day.getMonth()).to.equal(expectedMonth);
			done();
		});	
	});

	it('should get film screening times correctly', function(done){
		let expectedTime = '12:50';
		scheduleController.getSchedule('THE O2', 'https://www1.cineworld.co.uk/cinemas/london-the-o2-greenwich')
		.then(cinema => {
			expect(cinema.films[0].schedule[0].times[0]).to.equal(expectedTime);
			done();
		});	
	});
});