const express = require('express');
const { productDetails, updateProduct, addNewProduct, productList } = require('./controller')
const { verifyToken } = require('../authentication');
const productRouter = express.Router();

productRouter.route('/detail/:id').get(verifyToken, productDetails);
productRouter.route('/list/').get(verifyToken, productList)

productRouter.route('/add').post(
    verifyToken,
    addNewProduct
)
productRouter.route('/update/:id').put(verifyToken,updateProduct);

module.exports = productRouter;
