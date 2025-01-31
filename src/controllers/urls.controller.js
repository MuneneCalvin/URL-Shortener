const urlService = require('../services/urls.service');


const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;
        const shortUrl = await urlService.createShortUrl(originalUrl);
    
        res.status(201).json({ shortUrl });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', error: error.message  });
    }
};