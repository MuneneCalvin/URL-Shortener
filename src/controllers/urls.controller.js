const urlService = require('../services/urls.service');


const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const shortUrl = await urlService.createShortUrl(originalUrl, baseUrl);

        res.json({ 
            message: 'Short URL created successfully', 
            shortUrl: shortUrl.fullShortUrl,
            originalUrl: shortUrl.originalUrl
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

const  redirectToOriginalUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const originalUrl = await urlService.getOriginalUrl(shortUrl);

        if (originalUrl) {
            res.status(301).json({ message: 'Redirecting to original URL', originalUrl });
        } else {
            res.status(404).json({ error: 'Short URL not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', error: error.message });
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


const deleteUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        await urlService.deleteUrl(shortUrl);

        res.json({ message: 'Short URL deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', error: error.message });
    }
};


module.exports = {
    createShortUrl,
    getOriginalUrl,
    getAllUrls,
    updateShortUrl,
    deleteUrl,
};