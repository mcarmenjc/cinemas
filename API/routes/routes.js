var request = require('request');
var googleApiKey = "AIzaSyB_bVENhpQBDH3N_G5iNMlV0PLs9Tj20u4";
var appRouter = function(app) {
	app.get("/", function(req, res) {
	    res.send("Hello to cinemas api");
	});
	app.get("/cinemas", function (req, res){
		var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json" +
		 		   "?location=" + req.query.latitude + "," + req.query.longitude +
    			   "&radius=50000" +
    			   "&types=movie_theater" +
    			   "&key=AIzaSyB_bVENhpQBDH3N_G5iNMlV0PLs9Tj20u4";
		request(url, function (error, response, body) {
			if (!error && response.statusCode == 200){
				var cinemas = JSON.parse(body);
				console.log(cinemas.status);
			}
		});
		res.send(url);
	});
}
 
module.exports = appRouter;