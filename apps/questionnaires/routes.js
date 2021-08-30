const express = require('express');
const { checkSchema } = require('express-validator');
const { verifyToken } = require('../authentication');
const { addQuestionnaire, getQuestions } = require('./controller')

const routerQuestionnaire = express.Router();

routerQuestionnaire.route('/addquestions/').post( verifyToken, addQuestionnaire);
routerQuestionnaire.route('/get-questions/:productId').get(verifyToken, getQuestions);

module.exports = routerQuestionnaire;
