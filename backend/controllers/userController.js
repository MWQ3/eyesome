const asyncHandler = require('express-async-handler')
const bycrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// @ desc  Register a new user
// @ route /api/users
// @ access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
const { name, email, password } = req.body

if(!name || !email || !password) {
res.status(400)
throw new Error('Please include all fields')
}

// check to see if user already exists
const verifyUser = await User.findOne({ email })

if(verifyUser) {
    res.status(400)
    throw new Error('This Email is Already Taken')
}

// hash password
const salt = await bycrypt.genSalt(10)
const hashedPassword = await bycrypt.hash(password, salt)

// create user
const createUser = await User.create({
name,
email,
password: hashedPassword
})

if(createUser) {
    res.status(201).json({
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
        token: tokenGenerator(createUser._id),
    })   
} else {
    res.status(400)
    throw new Error('user doesn\'t exist')
}

})

// @ desc  Login user
// @ route /api/users/login
// @ access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
    // getting the email & password from the request body
    const {email, password} = req.body


    // checking to see if there's a user email
    const user = await User.findOne({ email })


    // running a conditional on the user email and the password to see if it matches
    if(user && (await bycrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: tokenGenerator(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Wrong Email or Password')
    }

})

// generate token
const tokenGenerator = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// @ desc  access current user
// @ route /api/users/me
// @ access PRIVATE
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user)
})

module.exports = {
registerUser,
loginUser,
getMe,
}