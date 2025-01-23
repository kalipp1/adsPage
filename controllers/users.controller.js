const Users = require('../models/users.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Users.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {

    try {
      const user = await Users.findById(req.params.id);
      if(!user) res.status(404).json({ message: 'Not found' });
      else res.json(user);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.postUser = async (req, res) => {
    try {

        const { login } = req.body;
        const { password } = req.body;
        const { avatar } = req.body;
        const { phone } = req.body;
        const newUser = new Users({ login: login, password: password, avatar: avatar, phone: phone });
        await newUser.save();
        res.json({ message: 'OK' });
    
      } catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.modifyUser = async (req, res) => {
    const { login } = req.body;
    const { password } = req.body;
    const { avatar } = req.body;
    const { phone } = req.body;

    try {
      const user = await Users.findByIdAndUpdate(
        req.params.id,
        { $set: { login: login, password: password, avatar: avatar, phone: phone }},
        { new: true }
      );
      if(user) {
        res.json(user);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id);
        if(user) {
          res.json(user);
        }
        else res.status(404).json({ message: 'Not found...' });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};