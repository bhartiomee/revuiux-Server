const accounts = require('./apps/accounts/routes');
const products = require('./apps/products/routes');
const questionnaires=require('./apps/questionnaires/routes');
const productreview = require('./apps/productreview/routes');
const prototypes = require('./apps/prototypes/routes');
const prototypeResponse=require('./apps/prototypeResponse/routes');
const questionnaireResponse = require('./apps/questionnaireResponse/routes');
const{Questionnaire,NewProduct,Prototype,PrototypeResponse,ProductReview,QuestionnaireResponse}=require('./models');
const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');

const app = express();

const server_port = process.env.PORT || 5000;

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    console.log(`EndPoint: ${url}  Method: ${method}`);
    next();
}

app.use(cors());
app.use(express.json());
app.use(logger);

// Apps routes
app.use('/accounts/', accounts);
app.use('/products/', products);
app.use('/prototypes/', prototypes);
app.use('/productreview/',productreview);
app.use('/questionnaires/',questionnaires);
app.use('/prototype-response/',prototypeResponse);
app.use('/questionnaire-response/',questionnaireResponse);

app.listen(server_port, async () => {
    await sequelize.authenticate();
    console.log(`Server is listening at port ${server_port}`);
});
