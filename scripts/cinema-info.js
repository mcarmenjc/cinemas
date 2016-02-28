"use strict";

let CinemaInfoController = require('./controllers/cinema-info-controller.js');

let cinemaInfoController = new CinemaInfoController();
cinemaInfoController.getCinemaInfo('picturehouse');