const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requied: true,
        minlength: 3,
        maxlength: 25
    },
    email: {
        type: String,
        requied: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    phoneNumber: {
        type: String,
        requied: true,
        minlength: 9,
        maxlength: 11,
    },
    password: {
        type: String,
        requied: true,
        minlength: 3,
        maxlength: 1024,
    },
})

userSchema.methods.genrateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.vidly_jwtPrivateKey)
}

const User = mongoose.model("User", userSchema)

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().email().min(6).required(),
        phoneNumber: Joi.string().required(),
        password: Joi.string().min(8).required(),
    })

    return schema.validate(user)
}

exports.User = User;
exports.validate = validateUser;