const express = require('express');
const { check, validationResult } = require('express-validator');
const fs = require('fs');
const https = require('https');
var cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
// const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(cors({ origin: 'https://localhost:3000', credentials:  true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(expressCspHeader({
//     directives: {
//         'default-src': [SELF],
//         'script-src': [SELF, INLINE],
//         'style-src': [SELF],
//         'img-src': ['data:', 'zentity.com'],
//         'worker-src': [SELF],
//         'block-all-mixed-content': true,
//     }
// }));

// Endpoints
const { API_USERS } = require('./config/endpoints');

// Models
const { User } = require('./models/user');

// MIddlewares
const { auth } = require('./middleware/auth');

// Functions
const userController = require('./methods/confirmation');

//=============================
//              USERS
//=============================

app.get(`${API_USERS}/auth`, auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role
    });
});

app.post(`${API_USERS}/register`, (req, res) => {
    
    // Make sure this account doesn't already exist
    User.findOne({email: req.body.email}, (err, user) => {
        if(user) return res.status(400).send({
            success: false,
            errCode: 'error.code.signup.email_exists'
        });
        
        const newUser = new User(req.body);
        newUser.save((err, doc) => {
            if(err) return res.json({
                success: false,
                error: err
            });
            
            newUser.generateToken((err, user) => {
                if(err) return res.status(400).send({
                    success: false,
                    error: err
                });
                
                // Send the email
                var transporter = nodemailer.createTransport({
                    service: 'Sendgrid',
                    auth: {
                        user: process.env.SENDGRID_USERNAME,
                        pass: process.env.SENDGRID_PASSWORD
                    }
                });
                var mailOptions = {
                    from: 'fifa.tournament.manager.dev@gmail.com',
                    to: newUser.email,
                    subject: 'Fifa Tournament Manager - Account Verification',
                    text: 'Please verify your account by clicking the link: \nhttps:\/\/' + process.env.APP_DOMAIN + '\/' + process.env.APP_CONFIRMATION_PATH + '\/' + user.token + '\n\nThank you, Fifa Tournament Manager.\n\nPlease do not reply to this email.'
                };
                transporter.sendMail(mailOptions, (err) => {
                    if(err) return res.status(500).send({
                        success: false,
                        error: err.message
                    });
                    res.status(200).send({success: true});
                });
            });
        });

    });
});

app.post(`${API_USERS}/login`, (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
        );
        res.header("Content-Type", "application/json;charset=UTF-8");

        let options = {
            httpOnly: true,
            secure: true,
            // maxAge: 1000000000,
        }

        if(!user) return res.status(401).json({
            success: false,
            errCode: 'error.code.auth_login.email_not_found'
        });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.status(401).json({
                success: false,
                errCode: 'error.code.auth_login.wrong_password'
            });

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                if(!user.isVerified) return res.status(401).send({
                    success: false,
                    errCode: 'error.code.auth_login.user_not_verified'
                });
                // Set cookie
                res.cookie('w_auth', user.token, options).status(200).send({
                    success: true,
                    info: {
                        accessToken: user.token,
                        email: user.email,
                        name: user.name,
                        lastName: user.lastName,
                    }
                });
            });
        });
    });
});

app.post(`${API_USERS}/confirmation`, [
    check('email').isEmail().withMessage('error.code.confirmation.email_not_valid')
], (req, res) => {
    // Check for validation errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Find a matching token
    User.findOne({ token: req.body.accessToken }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'error.code.confirmation.token_not_found' });

        // If we found a token, find a matching user
        User.findOne({ _id: token._id, email: req.body.email }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'error.code.confirmation.unable_to_find_token_for_user' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'error.code.confirmation.user_already_verified' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send({success: true});
            });
        });
    });
});

app.get(`${API_USERS}/logout`, auth, (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {token: ''},
        (err, doc) => {
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            })
        }
    );
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
.listen(process.env.PORT || 3002, () => {
    console.log(`Server running at ${process.env.PORT || 3002}`);
});