const express = require('express');
const { verifyToken} = require('../authentication')
const { researcherRegistration, participantRegistration, accountsMetaData, potentialUserLogin, productDetails, addNewProduct, updateProduct , userLogout} = require('./controller');
const { checkSchema } = require('express-validator');
const { validate } = require('./utils');
const { registrationValidator, loginValidator } = require('./validators');

const router = express.Router();

router.route('/signup/researcher').post(
    validate([checkSchema(registrationValidator)]),
    researcherRegistration
)
router.route('/signup/participant/').post(
    validate([checkSchema(registrationValidator)]),
    participantRegistration
);
router.route('/metadata/').get(accountsMetaData);
router.route('/login/').post(
    validate([checkSchema(loginValidator)]),
    potentialUserLogin
)
router.route('/logout/').put(
    verifyToken,
    userLogout
)

module.exports = router;
