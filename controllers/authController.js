const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const APIError = require('../utils/APIError');

exports.signup =catchAsync( async (req,res,next) => {
    const {name,email,password,passwordConfirm} = req.body;
    const newUser = await User.create({
        name,
        email,
        password,
        passwordConfirm
    });

    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
        
    res.status(201).json({
            status:'Success',
            token,
            data: {
                user:newUser
            }
        });

})