const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            // get token
            token = req.headers.authorization.split(' ')[1]
            // verify token by getting the user id from it
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // get the user from the token
            req.user = await User.findById(decoded.id).select('-password')
            // check to see if there's a user
            if(!req.user) {
                res.status(401)
                throw new Error('Not Authorized')
            }

            next()
            
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
            
        }
    }

    if(!token) {
        console.log(error)
        res.status(401)
        throw new Error('Not Authorized')
    }
})

module.exports = { protect }