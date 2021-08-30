const express = require('express');
const { checkSchema } = require('express-validator');
const { verifyToken } = require('../authentication');
const { addPrototype, prototypeDetails } = require('./controller')


const routerPrototype = express.Router();

routerPrototype.route('/add').post(
    verifyToken,
    addPrototype
)
routerPrototype.route('/detail/:productId/').get(
    verifyToken,
    prototypeDetails
)
module.exports = routerPrototype;
