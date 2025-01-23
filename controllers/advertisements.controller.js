const Advertisements = require('../models/advertisements.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Advertisements.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {

    try {
      const ad = await Advertisements.findById(req.params.id);
      if(!ad) res.status(404).json({ message: 'Not found' });
      else res.json(ad);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.postAd = async (req, res) => {
    try {

        const { title } = req.body;
        const { content } = req.body;
        const { publishDate } = req.body;
        const { image } = req.body;
        const { price } = req.body;
        const { location } = req.body;
        const { seller } = req.body;
        const newAdvertisement = new Advertisements({ title: title, content: content, publishDate: publishDate, image: image, price: price, location: location, seller: seller });
        await newAdvertisement.save();
        res.json({ message: 'OK' });
    
      } catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.modifyAd = async (req, res) => {
    const { title } = req.body;
    const { content } = req.body;
    const { publishDate } = req.body;
    const { image } = req.body;
    const { price } = req.body;
    const { location } = req.body;
    const { seller } = req.body;

    try {
      const ad = await Advertisements.findByIdAndUpdate(
        req.params.id,
        { $set: { title: title, content: content, publishDate: publishDate, image: image, price: price, location: location, seller: seller }},
        { new: true }
      );
      if(ad) {
        res.json(ad);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteAd = async (req, res) => {
    try {
        const ad = await Advertisements.findByIdAndDelete(req.params.id);
        if(ad) {
          res.json(ad);
        }
        else res.status(404).json({ message: 'Not found...' });
      }
      catch(err) {
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