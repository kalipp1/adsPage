const Advertisements = require('../models/advertisements.model');
const fs = require('fs');
const path = require('path');
const getImageFileType = require('../utils/getImageFileType');

exports.getAll = async (req, res) => {
  try {
    res.json(await Advertisements.find().populate({ path: 'seller', select: '-password' }));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {

    try {
      const ad = await Advertisements.findById(req.params.id).populate({ path: 'seller', select: '-password' });
      if(!ad) res.status(404).json({ message: 'Not found' });
      else res.json(ad);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.postAd = async (req, res) => {
  try {
      const { title, content, price, location } = req.body;
      const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

      //console.log(title, description, price, location, fileType );

      if (title && typeof title === 'string' && 
          content && typeof content === 'string' &&
          price && typeof price === 'string' && 
          location && typeof location === 'string') {

            if (!req.session.user.id) {
              if (req.file) {
                fs.unlinkSync(req.file.path)
              }
              return res.status(401).json({ message: 'You need to be logged in' });
            }

            if (!req.file || !['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
              if (req.file) {
                  fs.unlinkSync(req.file.path)
              }
              return res.status(400).json({ message: 'Please upload an image file' });
          }

          const currentDate = new Date();

          const newAd = new Advertisements(
            { title: title, 
              content: content, 
              publishDate: currentDate, 
              image: req.file.filename,
              price: price, 
              location: location, 
              seller: req.session.user.id }); 

          await newAd.save();
          res.status(201).json({ message: 'New ad added successfully' + newAd.title });

      } else {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        res.status(400).send({ message: 'Bad request ' });
      }

    } catch(err) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ message: err.message });
    }
};

exports.modifyAd = async (req, res) => {
  const { title, content, price, location } = req.body;
  const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

  try {
    const ad = await Advertisements.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    console.log(req.session);
    if (ad.seller.toString() !== req.session.user.id) {
      return res.status(403).json({ message: 'You are not authorized to modify this ad' });
    }

    if (req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
      if (ad.image) {
        const oldImagePath = path.join(__dirname, '..', 'public', 'uploads', ad.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      ad.image = req.file.filename;
    } else if (req.file) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Invalid file type. Please upload a valid image.' });
    }

    console.log(title, content, price, location);
    ad.title = title || ad.title;
    ad.content = content || ad.content;
    ad.price = price || ad.price;
    ad.location = location || ad.location;

    const updatedAd = await ad.save();

    res.status(200).json({ message: 'Ad updated successfully', ad: updatedAd });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteAd = async (req, res) => {
    try {
      const ad = await Advertisements.findById(req.params.id);
        if (!ad) {
            return res.status(404).json({ message: 'Not found...' });
        }

        if (ad.image) {
            const imagePath = path.join(__dirname, '..', 'public', 'uploads', ad.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await ad.deleteOne();
        res.json({ message: 'Ad deleted successfully' });
      } catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.searchByTitle = async (req, res) => {
    try {
      const searchPhrase = req.params.searchPhrase;
  
      const ads = await Advertisements.find({
        title: { $regex: searchPhrase, $options: 'i' } 
      });
  
      if (ads.length === 0) {
        res.status(404).json({ message: 'No advertisements found' });
      } else {
        res.json(ads);
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };