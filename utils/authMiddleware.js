const Session = require('../models/session.model');
const authMiddleware = async (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
        try {
          const sessionRecord = await Session.findOne({});
    
          if (!sessionRecord)
            return res.status(401).send({ message: 'You are not authorized' });
    
          const sessionData = JSON.parse(sessionRecord.session);
          req.session.user = {
            id: sessionData.user.id,
            login: sessionData.user.login,
          }
    
          console.log(req.session.user);
          return next();
        }
        catch (err) {
          console.error('Error in authMiddleware:', err);
          return res.status(401).send({ message: 'You are not authorized2' });
        }
      }
  
  try {
    if (!req.session || !req.session.user) {
      return res.status(401).send({ message: 'You are not authorized' });
    }

    const { id, login } = req.session.user;

    if (!id || !login) {
      return res.status(401).send({ message: 'Invalid session data' });
    }

    next();
  } catch (err) {
    console.error('Error in authMiddleware:', err);
    return res.status(500).send({ message: 'Server error' });
  }
};

module.exports = authMiddleware;

// const authMiddleware = async (req, res, next) => {

//   if (process.env.NODE_ENV !== "production") {

//     try {

//       const sessionRecord = await Session.findOne({});

//       if (!sessionRecord)
//         return res.status(401).send({ message: 'You are not authorized1' });

//       const sessionData = JSON.parse(sessionRecord.session);
//       req.session.user = {
//         id: sessionData.user.id,
//         login: sessionData.user.login,
//       }

//       next();
//     }
//     catch (err) {
//       console.error('Error in authMiddleware:', err);
//       return res.status(401).send({ message: 'You are not authorized2' });
//     }

//   }
//   else {
//     if (req.session.user) {
//       next();
//     } else {
//       res.status(401).send({ message: 'You are not authorized3' });
//     }
//   }
// }