const urlService = require('../services/urls.service');


const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;
        const shortUrl = await urlService.createShortUrl(originalUrl);

        res.json({ message: 'Short URL created successfully', shortUrl });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', error: error.message  });
    }
};

const getOriginalUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const originalUrl = await urlService.getOriginalUrl(shortUrl);

        if (originalUrl) {
            res.redirect(originalUrl);
        } else {
            res.status(404).json({ error: 'Short URL not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', error: error.message });
    }
};

const getAllUrls = async (req, res) => {
    try {
        const urls = await urlService.getAllUrls();

        res.json({ message: 'All URLs retrieved successfully', urls });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', error: error.message });
    }
};

const updateShortUrl = async (req, res) => {
    try {
        const { originalUrl, shortUrl } = req.body;
        await urlService.updateShortUrl(originalUrl, shortUrl);

        res.json({ message: 'Short URL updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', error: error.message });
    }
};


module.exports = {
    createShortUrl,
    getOriginalUrl,
    getAllUrls
};