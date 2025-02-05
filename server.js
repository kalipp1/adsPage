const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const MemoryStore = require('memorystore')(session);

const NODE_ENV = process.env.NODE_ENV;
// const DB_USERNAME = process.env.DB_USERNAME;
// const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_SESSION = process.env.DB_SESSION;

let dbURI = '';

if(NODE_ENV === 'production') dbURI = 'url to remote db';
else if(NODE_ENV === 'test') dbURI = 'mongodb://0.0.0.0:27017/adsPage';
else dbURI = 'mongodb://0.0.0.0:27017/adsPage';

const app = express();

mongoose.connect(dbURI);
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');

  const server = app.listen('8000', () => {
    console.log('Server is running on port: 8000');
  });

  const advertisementsRoutes = require('./routes/advertisements.routes');
  const authRoutes = require('./routes/auth.routes');

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(session({ secret: 'xyz567', resave: false, saveUninitialized: false, store: MongoStore.create({ mongoUrl: dbURI, }), cookie: { secure: true, httpOnly: true }, }));

  app.use('/api', advertisementsRoutes);
  app.use('/api/auth', authRoutes);

  app.use(express.static(path.join(__dirname, "/client/build")));
  app.use(express.static(path.join(__dirname, "/public")));

  app.use((req, res) => {
    res.status(404).send({ message: 'Not found...123' });
  });
});

db.on('error', err => console.log('Error ' + err));
