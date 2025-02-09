const Users = require('../models/users.model');
const bcrypt = require('bcryptjs');
const Session = require('../models/session.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.register = async (req, res) => {
    try {
        const { login, password, phone } = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

        if( login && typeof login == 'string' &&
            password && typeof password == 'string' && 
            req.file && ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].includes(fileType) &&
            phone && typeof phone == 'string' ) {
            const userWithLogin = await Users.findOne({ login });
            if (userWithLogin) {
                if(req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(409).send({ message: 'User with this login already exists' });
            }
            const user = await Users.create({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename, phone });
            res.status(201).send({ message: 'User created: ' + user.login });
        } else {
            if(req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(400).send({ message: 'Bad request' });
        }    
    } catch (err) {
        if(req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).send({ message: err.message });
    }   
}

exports.login = async (req, res) => {
    try {
        const { login, password }= req.body;
        if( login && typeof login === 'string' && password && typeof password === 'string' ) {
            const user = await Users.findOne({ login });
            
            if(!user) {
                res.status(400).send({ message: 'Login or password are incorrect' });
            } else {
                if(bcrypt.compareSync(password, user.password)){
                    const userObject = {
                        id: user.id,
                        login: user.login,
                      };
                      
                    var hour = 3600000
                    req.session.cookie.expires = new Date(Date.now() + hour)
                    req.session.cookie.maxAge = hour

                    req.session.user = userObject;
                    req.session.save();
                    console.log(userObject);
                    res.status(200).send({ message: 'Login successful'});
                }else{
                    res.status(400).send({ message: 'Login or password are incorrect' });
                }
            }
        }else {
            res.status(400).send({ message: 'Bad request' });
          }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getUser = async (req, res) => {
    res.send({ 
        message: "Yeah I'm logged",
        user: req.session.user.login,
		id: req.session.user.id,
     });
}

exports.logout = async (req, res) => {
    try {
        req.session.destroy();

        if (process.env.NODE_ENV !== "production") {
            await Session.deleteMany({});
        }

        res.status(200).send( { message: 'You have successfully logged out' });

    } catch (err) {
        res.status(400).send({ message: 'Bad request' });
    }
}