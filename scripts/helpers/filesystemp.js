"use strict";

let fs = require('fs');

let fileSystemPromise = {
	readFile: function(fileName){
		return new Promise(function(resolve, reject){
			fs.readFile(fileName, function(err, content){
				if (err){
					return reject(err);
				}
				resolve(content);
			});
		});
	}
};

module.exports = fileSystemPromise;