const { NewProduct } = require('../../models');
const { ValidationError , Sequelize, BOOLEAN } = require("sequelize");
const { RESEARCHER } = require("../../constants/modelConstants");

/**
 * Controller for login api
 * @param {*} req 
 * @param {*} res 
 */

const addNewProduct = async (req, res) => {
    const { name,
        goal,
        description,
        skills,
        location,
        project_tags,
        no_of_review_required,
        experience,
        industry,
        job_function,
    } = req.body;

    try {
        newProduct = await NewProduct.create({
            name,
            goal,
            description,
            skills,
            location,
            projectTags: project_tags,
            experience,
            industry,
            jobFunction: job_function,
            createdBy: req.potentialUserId,
            noOfReviewRequired: no_of_review_required,
            isPublished: false
        })
        res.status(200).json({
            product: newProduct,
            message: 'Product added sucessfully',
        })
    }
    catch (err) {
        if (err instanceof ValidationError) {
            res.status(400).json({ message: err.errors[0].message });
        } else {
            res.status(500).json({ message: "Unexpected exception occured while adding product" });
        }
    }
}

// details api for product
const productDetails = async (req, res) => {

    try {
        data = await NewProduct.findAll({
            where: {
                id: req.params.id
            }
        });
        response = {
            data: data[0],
            message: "success"
        }
        if (!data.length) {
            res.status(404).json({ message: "No data found" })
        } else {
            res.status(200).json(response)
        }
    }
    catch (error) {
        res.status(500).json({ message: "Unexpected exception occured" })
    }
}
//list api for product
const productList = async (req, res) => {
    try {
        const filters = req.query;
        if (req.potentialUserType === RESEARCHER) {
            filters.createdBy = {
                [Sequelize.Op.like]: `${req.potentialUserId}%`, 
            }
        }
        if(Object.keys(filters).every(key => NewProduct.rawAttributes.hasOwnProperty(key))){
            Object.keys(filters).forEach(key => NewProduct.tableAttributes[key].type.constructor.key === 'BOOLEAN' && ( filters[key] === 'true' ? filters[key] = true : filters[key] = false));
            data = await NewProduct.findAll({
                where: filters
            })
            response = {
                data: data,
                message: "success"
            }
            res.status(200).json(response)
        } else{
            res.status(404).json({ message: "Invalid query parameters" })
        }
  }
  catch (error) {
      res.status(500).json({ message: "Unexpected exception occured" })
  }
}

//put api for new product

const updateProduct = async (req, res) => {
  const { name, goal, description, skills, location, project_tags, no_of_review_required, is_published, 
    experience_options,industry, job_function } = req.body;
  try 
  {
    const newProduct = await NewProduct.update(
      { name, goal, description, skills, location, projectTags: project_tags,
        noOfReviewRequired: no_of_review_required, isPublished: is_published,
        experience: experience_options, industry, jobFunction: job_function
      },
      { where: { id: req.params.id } }
    );

    const updatedProduct = await NewProduct.findAll({
        where: { id: req.params.id }
    })

    if(!newProduct[0]){
        res.status(404).json({ message: "Product does not exist" });
    }
    else{
        res.status(200).json({ data: updatedProduct[0], message: "Product updated Successfully" });
    }
      
  }
  catch (err) 
  {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.errors[0].message });
    }
    else {
      res.status(500).json({ message: "Unexpected exception occured in model" });
    }
  }
};

module.exports = { productDetails, productList, updateProduct ,addNewProduct };
