const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const advertisementsSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 10, maxlength: 50 },
    content: { type: String, required: true, minlength: 20, maxlength: 1000 },
    publishDate: { type: Date, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    location: { type: String, required: true },
    seller: { type: ObjectId, required: true, ref: 'Users' },
  });

module.exports = mongoose.model('Advertisements', advertisementsSchema);