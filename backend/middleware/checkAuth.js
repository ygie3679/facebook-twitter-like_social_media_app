const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log("Check auth: here");
    const token = req.headers.authorization.split(" ")[1];
    //Handles error when headers does not contain a token
    if (!token) {
      throw new Error('Missing token, authentication failed!');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.userData = {userId: decodedToken.userId};
    next();

  } catch (error) {
    res.status(500).json({error: error.message});
    return next(error);
  }
};
