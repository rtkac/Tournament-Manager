const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(cors({ origin: 'https://localhost:3000' , credentials :  true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// Endpoints
const { API_USERS } = require('./config/endpoints');

// Models
const { User } = require('./models/user');

// MIddlewares
const { auth } = require('./middleware/auth');


//=============================
//              USERS
//=============================

app.get(`${API_USERS}/auth`, auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    });
});

app.post(`${API_USERS}/register`, (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({
            success: false,
            err
        });
        res.status(200).json({success: true});
    });
});

app.post(`${API_USERS}/login`, (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        
        console.log('---------------------------------------------------------------------------------------');
        // console.log(req);
        res.header("Access-Control-Allow-Credentials", true);
        // res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header(
            "Access-Control-Allow-Headers",
            "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
        );
        // __cfduid=dd62b4b52d8402d83a56cd9632fc44e2b1588848032; expires=Sat, 06-Jun-20 10:40:32 GMT; path=/; domain=.typicode.com; HttpOnly; SameSite=Lax

        let options = {
            // maxAge: 1000 * 60 * 15, // would expire after 15 minutes
            httpOnly: true, // The cookie only accessible by the web server
            // signed: true // Indicates if the cookie should be signed
            sameSite: 'None',
            secure: true
        }
        // Set cookie
        res.cookie('testCookie', `__${new Date().getMinutes()}_${new Date().getSeconds()}`, options);

        if(!user) return res.status(401).json({
            success: false,
            errCode: 'error.code.auth_login_email_not_found'
        });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.status(401).json({
                success: false,
                errCode: 'error.code.auth_login_wrong_password'
            });

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    success: true,
                    info: {
                        accessToken: user.token,
                        email: user.email,
                        name: user.name,
                        lastname: user.lastname,
                    }
                });
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


const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});