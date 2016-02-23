"use strict";

let request = require('request');

let requestp = {
	get: function(url){
		return new Promise (function(resolve, reject){
			request.get(url, function(err, res, body){
				if (err === undefined && res.statusCode !== 200){
					err = new Error(`Unexpected status code ${res.statusCode}`);
					err.res = res;
				}

				if (err){
					return reject(err);
				}

				resolve(body);
			});
		});
	}
};

module.exports = requestp;