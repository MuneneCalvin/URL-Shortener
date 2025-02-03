const express = require('express');
const urlsRoutes = require('./urls.routes');

const router = express.Router();


const defaultRoutes = [
    { path: '/urls', route: urlsRoutes },
];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router;