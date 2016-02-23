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
		done();
	});

	beforeEach(function(){
		scheduleController = new PicturehouseScheduleController('the ritzy', 'http://www.picturehouses.com/cinema/Ritzy_Picturehouse');
	});

	after(function(done){
		request.get.restore();
    	done();
	});

	it('should get all films in the page', function(done){
		scheduleController.getSchedule().then(cinema => {
			expect(cinema.films).to.have.length(8);
			done();
		});
	});

	it('should get film name correctly', function(done){
		let expectedName = 'A Bigger Splash';
		scheduleController.getSchedule().then(cinema => {
			let film = cinema.getFilm(expectedName);
			expect(film).to.not.be.undefined;
			expect(film.name).to.equal(expectedName);
			done();
		});
	});

	it('should add all days to film schedule when the film is screened everyday', function(done){
		let filmName = 'Deadpool';
		scheduleController.getSchedule().then(cinema => {
			let film = cinema.getFilm(filmName);
			expect(film.schedule).to.have.length(4);
			done();
		});
	});

	it('should add only one the days the film is screened', function(done){
		let filmName = 'Goosebumps 2D';
		scheduleController.getSchedule().then(cinema => {
			let film = cinema.getFilm(filmName);
			expect(film.schedule).to.have.length(2);
			done();
		});
	});

	it('should get screening date correctly', function(done){
		let filmName = 'Deadpool',
			expectedDay = 18,
			expectedMonth = 1;
		scheduleController.getSchedule().then(cinema => {
			let film = cinema.getFilm(filmName);
			expect(film.schedule[0].day.getDate()).to.equal(expectedDay);
			expect(film.schedule[0].day.getMonth()).to.equal(expectedMonth);
			done();
		});
	});

	it('should add special time to film day times', function(done){
		let filmName = 'Deadpool',
			expectedTime = '14:00';
		scheduleController.getSchedule().then(cinema => {
			let film = cinema.getFilm(filmName);
			expect(film.schedule[0].times[2]).to.equal(expectedTime);
			done();
		});
	});

	it('should add normal time to film day times', function(done){
		let filmName = 'Deadpool',
			expectedTime = '21:10';
		scheduleController.getSchedule().then(cinema => {
			let film = cinema.getFilm(filmName);
			expect(film.schedule[0].times[1]).to.equal(expectedTime);
			done();
		});
	});
});