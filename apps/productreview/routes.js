const express = require("express");
const { verifyToken } = require("../authentication");
const { addProductReview, productReviewList, researcherReviewList, productReviewResponse,updateReviewStatus } = require("./controller");
const routerReview = express.Router();

routerReview.route("/add-product-review/:productId").post(verifyToken, addProductReview);
routerReview.route("/product-review-list/").get(verifyToken, productReviewList);
routerReview.route("/researcher-review-list/").get(verifyToken, researcherReviewList);
routerReview.route("/product-review-response/:productId").get(verifyToken, productReviewResponse);
routerReview.route('/update/:id').put(verifyToken,updateReviewStatus)
module.exports = routerReview;
