const { ValidationError } = require("sequelize");
const { ProductReview, NewProduct, PotentialUser } = require("../../models");

//POST Api for product review
const addProductReview = async (req, res) => {
  const userId=req.potentialUserId;
  const productId=req.params.productId
  try {
    newReview = await ProductReview.create({
      userId: userId,
      productId: productId,
      reviewCompleted: false
    });
    id = newReview.id;
    res.status(200).json({id, message: "Product review added successfully" });
  } 
  catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.errors[0].message });
    } else {
      res.status(500).json({ message: "Unexpected exception occured" });
    }
  }
};

const productReviewList = async (req, res) => {
  try {
    const status = req.query.status;
    data = await ProductReview.findAll({
     where:{
         reviewCompleted: status,
         userId: req.potentialUserId,
     }, include: [{model:NewProduct, as:"newProduct"}]
    });
    response = {
      data:data,
      message: "success",
    };
    res.status(200).json(response);
  } 
  catch (error) {
    res.status(500).json({ message: "Unexpected exception occured" });
  }
};

const researcherReviewList = async (req, res) => {
  try {
    const isReviewed = req.query.is_reviewed === 'true';
    data = await ProductReview.findAll({
     where: {
        reviewCompleted: isReviewed,
     }, include: [{ model:NewProduct, createdBy: isReviewed, as:"newProduct" }]
    });
    response = {
      data: data,
      message: "success",
    };
    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({ message: "Unexpected exception occured" });
  }
};

const productReviewResponse = async (req, res) => {
  try {
    const data = await ProductReview.findAll({
      where: {
        productId: req.params.productId,
        reviewCompleted: true
      }, include: [{ model: PotentialUser, as:"potentialUser" }]
    })
    response = {
      data: data,
      message: "success",
    };
    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({ messag: "Unexpected exception occured" });
  }
}

const updateReviewStatus = async (req, res) => {
  try {
    const newReview = await ProductReview.update(
      { reviewCompleted: 1 },
      { where: { id: req.params.id  } }
    );

    const updatedReviewStatus = await ProductReview.findAll({
      where: { id: req.params.id  }
    })

    if (!updatedReviewStatus[0]) {
      res.status(404).json({ message: "Review does not exist" });
    }
    else {
      res.status(200).json({  message: "Review updated Successfully" });
    }
  }
  catch (err) {
    console.log(err);
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.errors[0].message });
    }
    else {
      res.status(500).json({ message: "Unexpected exception occured in model" });
    }
  }
}

module.exports = { addProductReview, productReviewList, researcherReviewList, productReviewResponse,updateReviewStatus };
