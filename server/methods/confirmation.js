const { check, validationResult } = require('express-validator');

const { User } = require('../models/user');

/**
* POST /confirmation
*/
exports.confirmationPost = ([
    check('email').isEmail()
], (req, res) => {

    console.log(req.body);
    console.log(req.body.email);

    // Check for validation errors 
    const errors = validationResult(req);
    console.log(errors);
    console.log(errors.array())
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    return;
    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

        // If we found a token, find a matching user
        User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
});