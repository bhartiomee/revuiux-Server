const express = require('express');
const { verifyToken } = require('../authentication');
const {getPrototypeResponse,addPrototypeResponse}=require('./controller');
const routerPrototypeResponse = express.Router();

routerPrototypeResponse.route('/get-prototype-response/:reviewId').get(
    verifyToken, getPrototypeResponse
);
routerPrototypeResponse.route('/add-prototype-response').post(
    verifyToken, addPrototypeResponse
);

module.exports = routerPrototypeResponse;
