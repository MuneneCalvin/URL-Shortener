const { urlModel } = require('../models/urls.model');
const shortid = require('shortid');


const createShortUrl = async (originalUrl) => {
    let url = await urlModel.findOne({ originalUrl });
    if (url) {
        return url;
    }

    const shortUrl = shortid.generate();
    url = new urlModel({
        originalUrl,
        shortUrl,
    });

    await url.save();
};

const getOriginalUrl = async (shortUrl) => {
    const url = await urlModel.findOne({ shortUrl });
    if (url) {
        url.clicks++;
        await url.save();
    }

    return url;
};
