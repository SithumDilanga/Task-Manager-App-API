// // const mongodb = require('mongodb');
// // const MongoClient = mongodb.MongoClient;

// const { MongoClient, ObjectId } = require('mongodb');

// const connectionURL = 'mongodb://127.0.0.1:27017';
// const databaseName = 'task-manager';

// const id = new ObjectId();
// console.log(id);
// console.log(id.getTimestamp());

// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
// 	if(error) {
// 		return console.log('Unable to connect to database!');
// 	}

// 	// create database
// 	const db = client.db(databaseName);

// 	//  create collection and documents
// 	// db.collection('users').insertOne({
// 	// 	_id: id,
// 	// 	name: 'joy',
// 	// 	age: 27
// 	// }, (error, result) => {
// 	// 	if(error) {
// 	// 		return console.log('Unable to insert the user');
// 	// 	}

// 	// 	console.log(result);
// 	// });

// 	// db.collection('users').insertMany([
// 	// 	{
// 	// 		name: 'jane',
// 	// 		age: 28
// 	// 	},
// 	// 	{
// 	// 		name: 'jone',
// 	// 		age: 29
// 	// 	}
// 	// ], (error, result) => {
// 	// 	if(error) {
// 	// 		console.log('Unable to insert documents');
// 	// 	}

// 	// 	console.log(result.insertedIds);

// 	// });

// 	// db.collection('tasks').insertMany([
// 	// 	{
// 	// 		description: 'task 1',
// 	// 		completed: true
// 	// 	},
// 	// 	{
// 	// 		description: 'task 2',
// 	// 		completed: false
// 	// 	},
// 	// 	{
// 	// 		description: 'task 3',
// 	// 		completed: true
// 	// 	}
// 	// ], (error, result) => {
// 	// 	if(error) {
// 	// 		console.log('Unable to insert documents');
// 	// 	}

// 	// 	console.log(result.insertedIds);

// 	// });

// 	// reading documents

// 	// db.collection('users').findOne({ _id: new ObjectId('6130c1f88a834153cf32bea2')}, (error, user) => {
// 	// 	if(error) {
// 	// 		return console.log('unable to fetch user');
// 	// 	}

// 	// 	console.log(user);

// 	// });

// 	// db.collection('users').find({ age: 23 }).toArray((error, users) => {
// 	// 	if(error) {
// 	// 		return console.log('unable to fetch user');
// 	// 	}

// 	// 	console.log(users);
// 	// });

// 	// update documents

// 	// db.collection('users').updateOne({
// 	// 	_id: new ObjectId('6130bf14e757790a8d93b744')
// 	// }, {
// 	// 	// $set: {
// 	// 	// 	name: 'Mike'
// 	// 	// }
// 	// 	$inc: {
// 	// 		age: 1
// 	// 	}
// 	// }).then((result) => {
// 	// 	console.log(result);
// 	// }).catch((error) => {
// 	// 	console.log(error);
// 	// });

// 	// db.collection('tasks').updateMany({
// 	// 	completed: false
// 	// }, {
// 	// 	$set: {
// 	// 		completed: true
// 	// 	}
// 	// }).then((result) => {
// 	// 	console.log(result);
// 	// }).catch((error) => {
// 	// 	console.log(error);
// 	// })

// 	// deleting documents

// 	db.collection('users').deleteMany({
// 		age: 23
// 	}).then((result) => {
// 		console.log(result);
// 	}).catch((error) => {
// 		console.log(error);
// 	});

// 	db.collection('tasks').deleteOne({
// 		description: 'task 2'
// 	}).then((result) => {
// 		console.log(result);
// 	}).catch((error) => {
// 		console.log(error);
// 	});


// });