const bcrypt = require('bcrypt');
const { User, ErrorResponse } = require('../model');
const { isEmail, isAlpha, isStrongPassword } = require('validator');


const router = require('express').Router();

const { HASH_SALT } = process.env;

// Register new User
router.post("/register", async (req, res, next) => {
    try {
        // Check user input
        if (!(req.body.email && req.body.password && req.body.firstName && req.body.lastName))
            throw new ErrorResponse(400, "All input is required");

        // Get user input
        const { firstName, lastName, email, password } = req.body;
        const { isValidEmail, isValidPassword, isValidFirstName, isValidLastName } = [isEmail(email), isStrongPassword(password), isAlpha(firstName), isAlpha(lastName)];

        if (!(isValidFirstName && isValidLastName && isValidEmail && isValidPassword))
            throw new ErrorResponse(400, {
                Email: isValidEmail ? 'Valid' : 'Need Valid Email',
                Password: isValidPassword ? 'Valid' : 'Password should have minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1',
                FirstName: isValidFirstName ? 'Valid' : 'FirstName required in Alphabet Format',
                LastName: isValidLastName ? 'Valid' : 'LastName required in Alphabet Format'
            })

        // check if user already exist
        const oldUser = await User.findOne({ Email: email }).exec();

        // Validate if user exist in our database
        if (oldUser != null)
            throw new ErrorResponse(409, "User Already Exist. Please Login");

        //Encrypt user password///
        const encryptedUserPassword = await bcrypt.hash(password, parseInt(HASH_SALT));

        let newUser = new User({
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: encryptedUserPassword
        });

        // Create user in our database
        let result = await newUser.save();
        console.log(`Register User-${result._id}-Success`);

        res.status(201).json({ message: "User successfully registered" });
    }
    catch (e) {
        next(e);
    }
});

// Validates user login credentials
router.post("/", async (req, res, next) => {
    try {

    }
    catch (e) {
        next(e);
    }
});

module.exports = router;