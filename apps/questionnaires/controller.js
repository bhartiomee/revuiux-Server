const { Questionnaire, PotentialUserToken } = require("../../models");
const { ValidationError } = require("sequelize");

// POST api for Questionnaire
const addQuestionnaire= async(req,res)=>{
  const { questions_preview } = req.body;
      try{
          newQuestion = await Questionnaire.bulkCreate(questions_preview,{ 
            updateOnDuplicate:["questionStatement","questionType","optionA","optionB","optionC","optionD"] 
          });
          res.status(200).json({
              data: newQuestion,
              message: "Question added and updated successfully" 
          });
      }
      catch (err) {
          if (err instanceof ValidationError) {
              res.status(400).json({ message: err.errors[0].message });
          }else {
              res.status(500).json({ message: "Unexpected exception occured" });
          }
      }
};

//GET api for Questionnaire

const getQuestions = async (req, res) => {
  try {
    data = await Questionnaire.findAll({
      where: {
        productId: req.params.productId,
      },
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
module.exports = { getQuestions, addQuestionnaire};
