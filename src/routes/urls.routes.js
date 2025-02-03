const express = require('express');
// const verifyToken = require('../middlewares/verifyToken');
const urlsController = require('../controllers/urls.controller');

const router = express.Router();

router.post('/shorten', urlsController.createShortUrl);
router.get('/:shortUrl', urlsController.getOriginalUrl);
router.get('/', urlsController.getAllUrls);
router.put('/', urlsController.updateShortUrl);
router.delete('/:shortUrl', urlsController.deleteUrl);


module.exports = router;