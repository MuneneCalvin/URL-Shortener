const shortid = require('shortid');
const urlModel = require('../models/urls.model');

const createShortUrl = async (originalUrl, baseUrl) => {
    let url = await urlModel.findOne({ originalUrl });

    const shortUrl = shortid.generate();
    url = new urlModel({
        originalUrl,
        shortUrl,
    });

    await url.save();
    
    // Add full URL to the response
    const urlObj = url.toObject();
    urlObj.fullShortUrl = `${baseUrl}/${shortUrl}`;
    return urlObj;
};

const getOriginalUrl = async (shortUrl) => {
    const url = await urlModel.findOne({ shortUrl });
    if (!url) {
        throw new Error('URL not found');
    }

    url.clicks++;
    await url.save();

    return url;
};

const getAllUrls = async () => {
    const urls = await urlModel.find()
        .sort({ createdAt: -1 })

    return urls;
};

const updateShortUrl = async (originalUrl, shortUrl) => {
    const url = await urlModel.findOne({ originalUrl });
    if (!url) {
        throw new Error('URL not found');
    }

    url.shortUrl = shortUrl;
};

const deleteUrl = async (shortUrl) => {
    const url = await urlModel.findOne({ shortUrl });
    if (!url) {
        throw new Error('URL not found');
    }

    url.is_deleted = true;
    await url.save();
};


module.exports = {
    createShortUrl,
    getOriginalUrl,
    getAllUrls,
    updateShortUrl,
    deleteUrl
};