var request = require('request');
var cheerio = require('cheerio');

function getOdeonFilmSchedule(filmElement){
	var filmSchedule = [];
	$(filmElement).find('div.times.containerWEEK').each(function(){
		var daySchedule = {};
		daySchedule.day = $(this).find('div.presentation-info.week').text();
		daySchedule.times = [];
		$(this).find('li a').each(function(){
			daySchedule.times.push($(this).text());
		});
		filmSchedule.push(daySchedule);
	});
	return filmSchedule;
}

function getOdeonFilmName(filmElement){
	return $(filmElement).find('div.presentation-info h4').text()
}

function getOdeonSchedule(url){
	request(url, function(error, response, body){
		if (error){
			throw (error);
		}
		$ = cheerio.load(body);
		$('.film-detail.WEEK').each(function(){
			console.log(getOdeonFilmName(this));
			console.log(JSON.stringify(getOdeonFilmSchedule(this)));
		})
	});
}

getOdeonSchedule('http://www.odeon.co.uk/cinemas/bfi_imax/211/');