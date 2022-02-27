const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth'); // auth middleware
const router = new express.Router();
const multer = require('multer');
const sharp = require('sharp');

const { sendWelcomeEmail, sendAccCancelEmail } = require('../emails/account');

// users post request
router.post('/users', async (req, res) => {
    const user = new User(req.body);
  
    try {
  
      await user.save();
      sendWelcomeEmail(user.email, user.name);
      const token = await user.generateAuthToken();
      
      res.status(201).send({ user, token });
  
    } catch(e) {
  
      res.status(400).send(e);
  
    }
  
    // this way is also possible
    // user.save().then(() => {
    //   res.status(201).send(user);
    // }).catch((e) => {
    //   res.status(400).send(e);
    // });
  });

  router.post('/users/login', async(req, res) => {

    try {

      const user = await User.findByCredentials(req.body.email, req.body.password);
      const token = await user.generateAuthToken();
      res.send({ user, token });

    } catch(e) {  
      res.status(400).send();
    }

  });

  // logout from the current session
  router.post('/users/logout', auth, async(req, res) => {
    try {

      // filter and remove current token from the tokens list in the database
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
      });

      await req.user.save();
      res.send();

    } catch(e) {
      res.status(500).send();
    }
  })

  // logout from all sessions
  router.post('/users/logoutAll', auth, async(req, res) => {
    try {

      req.user.tokens = []; // empty the tokens array
      await req.user.save();
      res.send();

    } catch(e) {
      res.status(500).send();
    }
  });

  // users get request. get all users from database
  // 'auth' middleware run first and if user authenticaed async callback will run
  router.get('/users/me', auth, async (req, res) => {

    // getting user details from the middleware and send. No need to find the user again in the database
    res.send(req.user);
  
    // try {
  
    //   const users = await User.find({});
    //   res.send(users);
  
    // } catch(e) {
  
    //   res.status(500).send();
  
    // }
  });
  
  // get a single user from the database. above route will the same thing
  // router.get('/users/:id', async (req, res) => {
  //   const _id = req.params.id;
  
  //   try {
  
  //     const user = await User.findById(_id);
  
  //     if(!user) {
  //       return res.status(404).send();
  //     }
  
  //     res.send(user);
  
  //   } catch(e) {
  //     res.status(500).send(e);
  //   }
  // });
  
  
  // update existing user data with patch request
  router.patch('/users/me', auth, async (req, res) => {
  
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
  
    //check user updates are icluded in allowedUpdates
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  
    if(!isValidOperation) {
      return res.status(400).send({error: 'Invalid updates!'})
    }
  
    try {
  
      // const user = await User.findById(req.user._id);

      updates.forEach((update) => req.user[update] = req.body[update]);

      await req.user.save();
      res.send(req.user)
      
    } catch (e) {
      res.status(400).send(e)
    }
  });
  
  // delete a user by id
  router.delete('/users/me', auth, async (req, res) => {
    try {
      
      // const user = await User.findByIdAndDelete(req.params.id);
  
      // if(!user) {
      //   return res.status(404).send({ error: 'user not found!' });
      // }

      await req.user.remove();
      sendAccCancelEmail(req.user.email, req.user.name);
      res.send(req.user);
  
    } catch(e) {
      res.status(500).send(e);
    }
  });

  // ------- upload profile image --------
  const storage = multer.memoryStorage();

  const upload = multer({
    dest: 'avatars',
    limits: {
      fileSize: 1000000
    },
    fileFilter(req, file, cb) {
      if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('please upload images'));
      }
  
      cb(undefined, true);
    },
    storage
  });

  router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {

    // resize and converte to png
    const buffer = await sharp(req.file.buffer)
      .resize({width: 250, height: 250})
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    
    res.send();
  }, (error, req, res, next) => {
    res.status(400).send({
      error: error.message
    });
  });

  // ------- END upload profile image --------

  // delete user avatar
  router.delete('/users/me/avatar', auth, async (req, res) => {
    try {

      req.user.avatar = undefined;
      await req.user.save();
      res.send();
  
    } catch(e) {
      res.status(500).send(e);
    }
  });

  // get user avatar
  router.get('/users/:id/avatar', async (req, res) => {
    try {

      const user = await User.findById(req.params.id);

      if(!user || !user.avatar) {
        throw new Error();
      }

      res.set('Content-Type', 'image/jpg');
      res.send(user.avatar);

    } catch(e) {
      res.status(404).send();
    }
  });


module.exports = router;