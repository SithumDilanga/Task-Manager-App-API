const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL,{
  maxPoolSize:50,
  wtimeoutMS:2500,
  useNewUrlParser:true
}).then(() => {
  console.log('Connected to MongoDB');
})
.catch((e) => {
  console.log('not connected', e);
});


// const task = new Task({
// 	isCompleted: true,
// 	description: 'bsdsds  '
// });
//
// task.save().then(() => {
// 	console.log(task);
// }).catch((error) => {
// 	console.log('Error!', error);
// });

// const me = new User({
// 	name: 'SDLive', 
// 	email: 'sd3@gmail.com  ',
// 	password: '19981130',
// 	age: 23
// });

// me.save().then(() => {
// 	console.log(me);
// }).catch((error) => {
// 	console.log('Error!', error);
// });