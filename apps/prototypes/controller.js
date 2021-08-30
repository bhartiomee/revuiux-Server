const { ValidationError } = require("sequelize");
const { Prototype } = require('../../models');
//Post api for product prototype
const addPrototype = async (req, res) => {
    const {preview_items} = req.body;
    try {
        newPrototype = await Prototype.bulkCreate(preview_items, {
            updateOnDuplicate: ['questionStatement','linkToFile'],
            });
        res.status(200).json({
            data: newPrototype,
            message: "Prototype added successfully"
        });
    }
    catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.errors[0].message });
        } else {
            res.status(500).json({ message: "Unexpected exception occured while adding prototype" });
        }
    }   
}

// GET Api for Prototype
const prototypeDetails = async (req, res) => {
    try {
        data = await Prototype.findAll({
            where: {
                productId: req.params.productId
            }
        });
        response = {
            data: data,
            message: "success"
        }
        res.status(200).json(response)
    }
    catch (error) {
        res.status(500).json({ message: "Unexpected exception occured" })
    }
}

module.exports = { addPrototype, prototypeDetails };
