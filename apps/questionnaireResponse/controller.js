const { QuestionnaireResponse, Questionnaire } = require("../../models");
const { ValidationError } = require("sequelize");

//Post Api for questionnaireResponse
const addQuestionnaireResponse = async (req, res) => {
  const { question_response } = req.body;
  try {
    newQuestionResponse = await QuestionnaireResponse.bulkCreate(
      question_response
    );
    res.status(200).json({
      message: "Question response added successfully",
    });
  } 
  catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Unexpected exception occured" });
    }
  }
};

//get Api for QuestionnaireResponse
const getQuestionnaireResponse = async (req, res) => {
  try {
    data = await QuestionnaireResponse.findAll({
      where: {
        reviewId: req.params.reviewId,
      }, include: [{ model: Questionnaire, as: "Questionnaire" }]
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

module.exports = { addQuestionnaireResponse, getQuestionnaireResponse };
