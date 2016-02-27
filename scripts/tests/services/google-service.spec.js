"use strict";

let GoogleService = require('../../services/google-service.js'),
	chai = require('chai'),
	sinon = require('sinon'),
	request = require('../../services/request-service.js'),
	fs = require('fs'),
	expect = chai.expect;

describe('GoogleService', function(){
	let googleService;

	describe('when doing a nearbysearch', function(){
		this.timeout(30000);
		function mockGetRequest (url){
			let regex = /.*name=(.+)/gmi,
				splitUrl = regex.exec(url),
				brandRequest = splitUrl[1],
				file = '',
				content;
			if (brandRequest === 'picturehouse'){
				file = '../data/' + brandRequest + '.json';
			}
			if (brandRequest.includes('cineworld')){
				if(!brandRequest.includes('pagetoken')){
					file = '../data/cineworld-first-page.json';
				}
				else{
					file = '../data/cineworld-second-page.json';
				}
			}
			if (brandRequest.includes('odeon')){
				if(!brandRequest.includes('pagetoken')){
					file = '../data/odeon-first-page.json';
				}
				if(brandRequest.includes('pagetoken=CpQCCQEAA')){
					file = '../data/odeon-second-page.json';
				}
				if(brandRequest.includes('pagetoken=CrQDqQE')){
					file = '../data/odeon-third-page.json';
				}
			}
			content = fs.readFileSync(file, 'utf8');
			return new Promise(function(resolve, reject){
				resolve(content);
			});
		}

		before(function(done){
			sinon.stub(request, "get", mockGetRequest);
			done();
		});

		beforeEach(function(){
			googleService = new GoogleService();
		});

		after(function(done){
			request.get.restore();
	    	done();
		});

		it('should get all cinemas when there are less than 20 results', function(done){
			googleService.getCinemasByBrand('picturehouse')
			.then(cinemas => {
				expect(cinemas).to.have.length(11);
				done();
			});
		});

		it('should get all cinemas when there are between 20 and 40 results', function(done){
			googleService.getCinemasByBrand('cineworld')
			.then(cinemas => {
				expect(cinemas).to.have.length(26);
				done();
			});
		});

		it('should get all cinemas when there are more than 40', function(done){
			googleService.getCinemasByBrand('odeon')
			.then(cinemas => {
				expect(cinemas).to.have.length(60);
				done();
			});
		});
	});
});