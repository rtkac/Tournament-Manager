const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SALT_I = 10;
const TOKEN_EXPIRATION = '1h';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 43200
    },
});

userSchema.pre('save', function(next) {
    var _this = this;

    if(_this.isModified('password')) {
        bcrypt.genSalt(SALT_I, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash(_this.password, salt, function(err, hash) {
                if(err) return next(err);
                _this.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function(cb) {
    var _this = this;
    var token = jwt.sign(_this._id.toHexString(), process.env.SECRET);

    _this.token = token;
    _this.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    });
};

userSchema.statics.findByToken = function(token, cb) {
    var _this = this;
    
    jwt.verify(token, process.env.SECRET, function(err, decode) {
        _this.findOne({
            "_id": decode,
            "token": token
        }, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        });
    });
};


const User = mongoose.model('User', userSchema);
module.exports = { User };