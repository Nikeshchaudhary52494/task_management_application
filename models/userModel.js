const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Name cannot excced 30 character"],
        minLength: [4, "Name should have atleast 4 character"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your Email"],
        unique: [true, "email Id already registerd"],
        validate: [validator.isEmail, "Please Enter a valid email"],

    },
    password: {
        type: String,
        required: [true, "Please Enter your Password"],
        minLength: [8, "password should have 8 character minimum"],
    },
})

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

module.exports = mongoose.model("USer", userSchema);