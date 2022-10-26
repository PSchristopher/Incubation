// const { response } = require('express')
const {postSignUp,postSignIn,postApp, jwtVari, verifyJWT} =require("../controller/userController")
const express = require('express')
const router = express.Router()

// const signUpForm = require('../models/users/register')



router.post('/signup',postSignUp)
router.post('/login',postSignIn)
router.get('/isUserAuth',verifyJWT ,  jwtVari)
router.post('/',postApp)

module.exports = router;