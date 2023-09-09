const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const { sendToken } = require("../utils/jwtToken");
// const crypto = require("crypto");
const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

// Regiser a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(new ErrorHandler("All fields are required!"));
    }
    const isUserAvailable = await User.findOne({ email });
    if (isUserAvailable) {
        return next(new ErrorHandler("User already registered", 500))
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({
            success: true,
            _id: user._id,
            email: user.email
        })
    }
})


// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("please Enter Email and Password", 400))
    }

    const user = await User.findOne({ email: email });
    // compare password with HashedPassword
    if (user && (await bcrypt.compare(password, user.password))) {
      
        
        // res.status(200).json({ accessToken })
        sendToken(user,200,res);
    } else {
        return next(new ErrorHandler('inValid Email and Password', 401));
    }

})


// logout
exports.logoutuser = catchAsyncErrors(async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,

    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })


})

