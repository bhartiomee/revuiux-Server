const { PrototypeResponse, Prototype } = require("../../models");
const { ValidationError } = require("sequelize");

const getPrototypeResponse = async (req, res) => {
  try {
    data = await PrototypeResponse.findAll({
      where: {
        reviewId: req.params.reviewId,
      }, include: [{ model: Prototype, as: "Prototype"}]
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

const addPrototypeResponse = async (req, res) => {
  const { prototype_response } = req.body;
  try {
    newPrototypeResponse = await PrototypeResponse.bulkCreate(prototype_response);
    res.status(200).json({ message: "Prototype response added successfully" });
  } 
  catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Unexpected exception occured" });
    }
  }
};

module.exports = { getPrototypeResponse, addPrototypeResponse };
