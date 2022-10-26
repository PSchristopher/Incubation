// const { response } = require('express')
const {postSignUp,postSignIn,postApp} =require("../controller/userController")
const express = require('express')
const router = express.Router()
// const signUpForm = require('../models/users/register')



router.post('/signup',postSignUp)
router.post('/login',postSignIn)
router.post('/',postApp)

module.exports = router;