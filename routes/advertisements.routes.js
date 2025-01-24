const express = require('express');
const router = express.Router();
const AdvertisementsController = require('../controllers/advertisements.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', AdvertisementsController.getAll);
router.get('/ads/:id', AdvertisementsController.getById);
router.get('/ads/search/:searchPhrase', AdvertisementsController.searchByTitle);
router.post('/ads',authMiddleware, imageUpload.single('image'), AdvertisementsController.postAd);
router.put('/ads/:id', AdvertisementsController.modifyAd);
router.delete('/ads/:id', AdvertisementsController.deleteAd);

module.exports = router;