var MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017/magic';

function connect(){
	return new Promise((resolve, reject) => {
		MongoClient.connect(uri, function(error, db){
			if (error){
				return reject(error);
			}
			resolve(db);
		});
	});
}

function insertOne(db, collection, document){
	let dbCollection = db.collection(collection);
	return new Promise((resolve, reject) => {
		dbCollection.insertOne(document, function(error, result){
			if (error){
				return reject(error);
			}
			resolve(result);
		});
	});
}

function insertMany(db, collection, documents){
	let dbCollection = db.collection(collection);
	return new Promise((resolve, reject) => {
		dbCollection.insertMany(documents, function(error, result){
			if (error){
				return reject(error);
			}
			resolve(result);
		});
	});
}

function find(db, collection, query){
	let dbCollection = db.collection(collection);
	return new Promise((resolve, reject) => {
		dbCollection.find(query).toArray(function(error, documents){
			if (error){
				return reject(error);
			}
			resolve(documents);
		});
	});
}

function updateOne(db, collection, docQuery, updatedData){
	let dbCollection = db.collection(collection);
	return new Promise((resolve, reject) => {
		dbCollection.updateOne(docQuery, updatedData, function(error, result){
			if (error){
				return reject(error);
			}
			resolve(result);
		});
	});
}

function insertDocument(collection, document){
	return connect().then(db => {
		insertOne(db, collection, document).then(result => {
			db.close();
		});
	});
}

function insertDocuments(collection, document){
	return connect().then(db => {
		insertMany(db, collection, document).then(result => {
			db.close();
		});
	});
}

function queryAll(collection){
	let query = undefined;
	return connect().then(db => {
		find(db, collection, query).then(documents => {
			db.close();
			return documents;
		});
	});
}

function query(collection, query){
	return connect().then(db => {
		find(db, collection, query).then(documents => {
			db.close();
			return documents;
		});
	});
}

function update (collection, docQuery, newData) {
	return connect().then(db => {
		updateOne(db, docQuery, newData).then(result => {
			db.close();
		});
	});	
}

module.exports = {
	insertDocument: insertDocument,
	insertDocuments: insertDocuments,
	queryAll: queryAll,
	query: query,
	update: update
}