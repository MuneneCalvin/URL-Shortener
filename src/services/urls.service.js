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
