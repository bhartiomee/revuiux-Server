const registrationValidator = {
    confirm_password: {
        exists: true,
        custom: {
            options: (value, { req }) => value === req.body.password,
            errorMessage: value => value ? "Password and Confirm Password should be same" : "Required Field"
        }
    }
};

/**
 * Validation while login the user
 */
const loginValidator = {
    email: {
        isEmail: true,
        exists: true
    },
    password: {
        exists: true,
        notEmpty: true,
        errorMessage: "Required Field"
    }
};

module.exports = { registrationValidator, loginValidator };
