"use strict";

let CinemaInfoController = require('../../controllers/cinema-info-controller.js'),
	dbService = require('../../services/mongodb-service.js'),
	Cinema = require('../../models/cinema.js'),
	chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	expect = chai.expect;

	chai.use(sinonChai);

describe('CinemaInfoController', function(){
	describe('when getting the list of cinemas for a brand', function(){
		let cinemaInfoController;
		let getCinemasStub;
		function mockInsertDocument (){
			return new Promise(function(resolve, reject){
				resolve(true);
			});
		}

		before(function(){
			sinon.stub(dbService, "insertDocument", mockInsertDocument);
		});

		beforeEach(function(){
			cinemaInfoController = new CinemaInfoController();
			getCinemasStub = sinon.stub(cinemaInfoController.googleService, 'getCinemasByBrand', function(){
				return new Promise(function(resolve, reject){
					resolve([]);
				});
			});
		});

		after(function(){
			dbService.insertDocument.restore();
		});

		it('should get a list of cinemas using the GoogleService', function(done){
			let cinemaName = 'cinema';
			cinemaInfoController.saveCinemasInfo(cinemaName);
			expect(getCinemasStub).to.have.been.called;
			expect(getCinemasStub).to.have.been.calledWith(cinemaName);
			done();
		});
	});

	describe('when getting the cinema details', function(){
		let cinemaInfoController,
			getCinemasStub,
			getDetailsStub;
		function mockInsertDocument (){
			return new Promise(function(resolve, reject){
				resolve(true);
			});
		}

		before(function(){
			sinon.stub(dbService, "insertDocument", mockInsertDocument);
		});

		beforeEach(function(){
			cinemaInfoController = new CinemaInfoController();
			getCinemasStub = sinon.stub(cinemaInfoController.googleService, 'getCinemasByBrand', function(){
				return new Promise(function(resolve, reject){
					resolve([{
			            geometry: {
			                location: {
			                    lat: 51.54503599999999,
			                    lng: -0.4760121
			                }
			            },
			            icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/movies-71.png',
			            id: '26e8980313aee19a47a287c45e31ead729305981',
			            name: 'Odeon Cinema Uxbridge',
			            opening_hours: {
			                open_now: true,
			                weekday_text: []
			            },
			            place_id: 'ChIJcZ1xXg5udkgRleINWx2c0Ls',
			            rating: 3.7,
			            reference: 'CnRpAAAAOxtqEfRQviJHUh5hVizskPavkoxUA8LIkTUsgIylnU2cEsDqDDUm_N5DVkdf8ojCmfypOUk7mosOyxH_LflnhbRVW14-AhySSMzVV9RRgQAqfThKyhYoYiyjF1ICio1w5aUn12koN0vP3HTpgGEE_xIQ5_Mg6jXPKeEjfdfH8-cExBoU3gurTc1B1dymAX3q6frwTUnKpK8',
			            scope: 'GOOGLE',
			            types: [
			                'movie_theater',
			                'movie_rental',
			                'point_of_interest',
			                'establishment'
			            ],
			            vicinity: 'The Chimes Shopping Centre, Uxbridge'
			        }]);
				});
			});
			getDetailsStub = sinon.stub(cinemaInfoController.googleService, 'getDetails', function(){
				return new Promise(function(resolve, reject){
					resolve({
						adr_address: 'Surrey Quays Leisure Park, <span class=\"street-address\">Redriff Rd</span>, <span class=\"extended-address\">London</span>, <span class=\"locality\">Surrey Quays</span> <span class=\"postal-code\">SE16 7LL</span>, <span class=\"country-name\">United Kingdom</span>',
				        formatted_address: 'Surrey Quays Leisure Park, Redriff Rd, London, Surrey Quays SE16 7LL, United Kingdom',
				        formatted_phone_number: '0871 224 4007',
				        geometry: {
				            location: {
				                lat: 51.4960742,
				                lng: -0.0448185
				            }
				        },
				        international_phone_number: '+44 871 224 4007',
				        name: 'Odeon Cinema Surrey Quays',
				        photos: [
				            {
				                height: 600,
				                html_attributions: [
				                    '<a href=\"https://maps.google.com/maps/contrib/113911589785180948601/photos\">Odeon Cinema Surrey Quays</a>'
				                ],
				                photo_reference: 'CmRdAAAAlr9csg1gBEW97zw8OJ48oEQcgt3nMV_8HvDXXU6SpHr3HeywBccX2l7BFcc3BZa_msd2zodBfDApYVtUzV5eIfJBV5RwUJm76IuaUhvSWPzAi_U4NkVWhakSXCcLi3bREhCBxLWR1rK7sS7YniHh8FfAGhQOOKDiE70Npic5xJIIB2e1ZN77gA',
				                width: 600
				            }
				        ],
				        place_id: 'ChIJcZ1xXg5udkgRleINWx2c0Ls',				        
				        scope: 'GOOGLE',
				        types: [
				            'movie_theater',
				            'point_of_interest',
				            'establishment'
				        ],
				        url: 'https://maps.google.com/?cid=14278346218517626085',
				        vicinity: 'Surrey Quays Leisure Park, Redriff Road, London, Surrey Quays',
				        website: 'http://www.odeon.co.uk/cinemas/surrey_quays/18/?utm_source=google&utm_medium=maps&utm_content=surreyquays&utm_campaign=googleplaces'
					});
				});
			});
		});

		after(function(){
			dbService.insertDocument.restore();
		});

		it('should get the details of a cinema using GoogleService', function(done){
			let cinemaName = 'cinema';
			let cinemaId = 'ChIJcZ1xXg5udkgRleINWx2c0Ls';
			cinemaInfoController.saveCinemasInfo(cinemaName).then(function(){
				expect(getDetailsStub).to.have.been.called;
				expect(getDetailsStub).to.have.been.calledWith(cinemaId);
				done();
			});
		});

		it('should get the details for the cinemas in the list', function(done){
			let cinemaName = 'cinema';
			let cinemaId = 'ChIJcZ1xXg5udkgRleINWx2c0Ls';
			let getCinemaDetailsSpy = sinon.spy(cinemaInfoController, 'getCinemaDetails');
			cinemaInfoController.saveCinemasInfo(cinemaName).then(function(){
				expect(getCinemaDetailsSpy).to.have.been.called;
				expect(getCinemaDetailsSpy).to.have.been.calledWith(cinemaId);
				done();
			});
		});
	});
	
	describe('when the cinema details are got', function(){
		let cinemaInfoController,
			getCinemasStub;
		function mockInsertDocument (){
			return new Promise(function(resolve, reject){
				resolve(true);
			});
		}

		before(function(){
			sinon.stub(dbService, "insertDocument", mockInsertDocument);
		});

		beforeEach(function(){
			cinemaInfoController = new CinemaInfoController();
			getCinemasStub = sinon.stub(cinemaInfoController.googleService, 'getCinemasByBrand', function(){
				return new Promise(function(resolve, reject){
					resolve([{
			            geometry: {
			                location: {
			                    lat: 51.54503599999999,
			                    lng: -0.4760121
			                }
			            },
			            icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/movies-71.png',
			            id: '26e8980313aee19a47a287c45e31ead729305981',
			            name: 'Odeon Cinema Uxbridge',
			            opening_hours: {
			                open_now: true,
			                weekday_text: []
			            },
			            place_id: 'ChIJcZ1xXg5udkgRleINWx2c0Ls',
			            rating: 3.7,
			            reference: 'CnRpAAAAOxtqEfRQviJHUh5hVizskPavkoxUA8LIkTUsgIylnU2cEsDqDDUm_N5DVkdf8ojCmfypOUk7mosOyxH_LflnhbRVW14-AhySSMzVV9RRgQAqfThKyhYoYiyjF1ICio1w5aUn12koN0vP3HTpgGEE_xIQ5_Mg6jXPKeEjfdfH8-cExBoU3gurTc1B1dymAX3q6frwTUnKpK8',
			            scope: 'GOOGLE',
			            types: [
			                'movie_theater',
			                'movie_rental',
			                'point_of_interest',
			                'establishment'
			            ],
			            vicinity: 'The Chimes Shopping Centre, Uxbridge'
			        }]);
				});
			});
		});

		after(function(){
			dbService.insertDocument.restore();
		});

		it('should save the cinema info', function(done){
			let cinemaName = 'cinema';
			let cinema = new Cinema({
				address: 'address',
				phoneNumber: '07654321000',
				name: cinemaName,
				googlePlaceId: '111111111',
				website: 'http://cinema.cinema',
				location: {
					lat: 0,
					lng: 0
				}
			});
			let cinemaSaveSpy = sinon.spy(cinema, 'save');
			let getCinemaDetailsStub = sinon.stub(cinemaInfoController, 'getCinemaDetails', function(){
				return new Promise(function(resolve, reject){
					resolve(cinema);
				});
			});
			cinemaInfoController.saveCinemasInfo(cinemaName).then(function(){
				expect(cinemaSaveSpy).to.have.been.called;
				done();
			});
		});
	});
});