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
	},

	post: function(url, params){
		let paramString = '',
			urlParam;
		for (let key in params){
			paramString = paramString + (paramString === '' ? '?' : '&')
			paramString = paramString + key + '=' + encodeURI(params[key]);
		}
		urlParam = url + paramString;
		console.log(urlParam);
		return new Promise (function(resolve, reject){
			request.post(urlParam, function(err, res, body){
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