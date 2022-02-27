const express = require('express');
require('./db/mongoose');
const jwt = require('jsonwebtoken');
const userRouter = require('./routers/userRoute');
const taskRouter = require('./routers/taskRouter');

const app = express();
const port = process.env.PORT;

// example of multer
const multer = require('multer');
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('please upload word document'));
    }

    cb(undefined, true);
  }
});

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({
    error: error.message
  });
});


// express middleware practice code
// app.use((req, res, next) => {
//   if(req.method === 'GET') {
//     res.send('GET req are disabled!');
//   } else {
//     next();
//   }
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})

// const myFunction = async() => {
//   const token = jwt.sign({ _id: 'abc1234' }, 'thisissecret', {expiresIn: '7 days'});
//   console.log(token);
 
//   const data = jwt.verify(token, 'thisissecret');
//   console.log(data);
  

// }

// myFunction();

const Task = require('./models/task');
const User = require('./models/user');

const main = async() => {
  // const task = await Task.findById('61544efb9a6f9219680d31c0');
  // await task.populate('owner');
  // console.log(task.owner);

  // const user = await User.findById('61544ef19a6f9219680d31ba');
  // await user.populate('tasks');
  // console.log(user.tasks);
  
  
}

main();