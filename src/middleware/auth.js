const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async  (req, res, next) => {
  try {

		// get bearer token value from the header request and exclude 'Bearer ' text part
		const token = req.header('Authorization').replace('Bearer ', '');

		// verify token with secret description
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// find the user by using id
		const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

		if(!user) {
			throw new Error();
		}

		req.token = token; // set request token to current token
		req.user = user; // set request user to current user
		next(); // execute route
		
	} catch(e) {
		res.status(401).send({ error: 'Please authenticate!' });
	}   
}

module.exports = auth;