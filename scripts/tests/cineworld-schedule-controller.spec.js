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
});