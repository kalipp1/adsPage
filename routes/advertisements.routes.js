const express = require('express');
const router = express.Router();
const AdvertisementsController = require('../controllers/advertisements.controller');

router.get('/ads', AdvertisementsController.getAll);
router.get('/ads/:id', AdvertisementsController.getById);
router.get('/ads/search/:searchPhrase', AdvertisementsController.searchByTitle);
router.post('/ads', AdvertisementsController.postAd);
router.put('/ads/:id', AdvertisementsController.modifyAd);
router.delete('/ads/:id', AdvertisementsController.deleteAd);

module.exports = router;