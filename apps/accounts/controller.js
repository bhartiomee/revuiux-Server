const { ValidationError } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { RESEARCHER, PARTICIPANT } = require("../../constants/modelConstants");
const {
  experience_options,
  industry,
  job_function,
  highest_education,
  gender,
  potential_user_types,
} = require("../../constants/modelConstantsMapping");
const {
  PotentialUser,
  PotentialUserToken,
} = require("../../models");

/**
 * Controller for registering the researcher
 * @param {*} req
 * @param {*} res
 */
const researcherRegistration = async (req, res) => {
  const { name, email, password, phone, location, research_description } =
    req.body;
  try {
    // testing the creationo of PotentialToken
    const user = await PotentialUser.create({
      name: name,
      email: email,
      password: password,
      phone: phone,
      location: location,
      researchDescription: research_description,
      potential_user_type: RESEARCHER,
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Unexpected exception occured" });
    }
  }

  res.status(200).json({
    message: "Participant created successful",
  });
};

/**
 * Controller for registering the participant
 * @param {*} req
 * @param {*} res
 */
const participantRegistration = async (req, res) => {
  const {
    name,
    password,
    phone,
    email,
    location,
    gender,
    social_media_link,
    experience,
    industry,
    job_function,
    highest_education,
    research_description,
    skills,
  } = req.body;

  try {
    potentialUser = await PotentialUser.create({
      name,
      potential_user_type: PARTICIPANT,
      password,
      phone,
      email,
      location,
      gender,
      socialMediaLink: social_media_link,
      experience,
      industry,
      jobFunction: job_function,
      highestEducation: highest_education,
      researchDescription: research_description,
      skills,
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Unexpected exception occured" });
    }
  }
  res.status(200).json({
    message: "Participant created successful",
  });
};

/**
 * Controller to get the accounts app meta data
 * @param {*} req
 * @param {*} res
 */
const accountsMetaData = (req, res) => {
  res.status(200).json({
    experience_options,
    industry,
    job_function,
    highest_education,
    gender,
    potential_user_types,
  });
};

/**
 * Controller for login api
 * @param {*} req
 * @param {*} res
 */
const potentialUserLogin = async (req, res) => {
  const { email, password } = req.body;
  // Fetching the user from the PotentialUser table
  try {
    const user = await PotentialUser.findAll({
      where: {
        email,
        password,
      },
    });
    if (!user.length) {
      res.status(400).json({ message: "Invalid Credentials" });
    }
    // Creating the authentication token for successfull email and password match
    const potentialUserToken = await PotentialUserToken.create({
      potentialUserId: user[0].id,
      key: uuidv4(),
    });
    res.status(200).json({
      token: potentialUserToken.key,
      email,
      potential_user_type: user[0].potential_user_type,
      name: user[0].name
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Unexpected exception occured" });
    }
  }
};

//PUT Api for Logout
const userLogout = async (req, res) => {
  const { expiryTime, key } = req.body;
  try{
    const potentialUserLogout = await PotentialUserToken.update(
      { 
        expiryTime: Date.now()
        },
      {
        where : { key: req.token}
      }
    );
    res.status(200).json({
    message: "User logged out successfully",
  });

  }
  catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.errors[0].message });
    }
    else {
      res.status(500).json({ message: "Unexpected exception occured" });
    }
  }
};

module.exports = {
  researcherRegistration,
  participantRegistration,
  accountsMetaData,
  potentialUserLogin,
  userLogout,
};
