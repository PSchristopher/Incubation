const { response } = require('express')
const express = require('express')
const router = express.Router()
const signUpForm = require('../models/users/register')


router.post('/signup',(req,res)=>{
    response.send('send')
})

module.exports = router