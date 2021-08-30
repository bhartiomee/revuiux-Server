const express = require('express');
const { checkSchema } = require('express-validator');
const { verifyToken } = require('../authentication');
const { addQuestionnaireResponse, getQuestionnaireResponse } = require('./controller');

const routerQuestionnaireResponse =express.Router();

routerQuestionnaireResponse.route('/add-question-response/').post(
    verifyToken,
    addQuestionnaireResponse);

routerQuestionnaireResponse.route('/get-question-response/:reviewId').get(
    verifyToken,
    getQuestionnaireResponse
);

module.exports = routerQuestionnaireResponse;
