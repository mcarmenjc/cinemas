"use strict";

let CinemaInfoController = require('../../controllers/cinema-info-controller.js'),
	chai = require('chai'),
	sinon = require('sinon'),
	GoogleService = require('../../services/google-service.js'),
	expect = chai.expect;

describe('CinemaInfoController', function(){
	let cinemaInfoController;
	function mockGetCinemasBrand (){
		return new Promise(function(resolve, reject){
			resolve([]);
		});
	}

	function mockGetCinemaDetails (){
		return new Promise(function(resolve, reject){
			resolve({});
		});
	}

	before(function(done){
		//sinon.stub(request, "get", mockGetRequest);
		//sinon.stub(request, "post", mockPostRequest);
		done();
	});

	beforeEach(function(){
		cinemaInfoController = new CinemaInfoController();
	});

	after(function(done){
    	done();
	});

	it('should check something', function(done){
		done();
	});
});