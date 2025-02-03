const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const urlsController = require('../controllers/urls.controller');

const router = express.Router();

router.post('/shorten', verifyToken, urlsController.createShortUrl);
router.get('/:shortUrl', urlsController.getOriginalUrl);
router.get('/', urlsController.getAllUrls);
