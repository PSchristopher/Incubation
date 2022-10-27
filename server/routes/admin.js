const {applist,adminLogin, jwtAdminVari, verifyAdminJWT} = require("../controller/adminController")
const express = require("express")
const router = express.Router()

router.post('/login',adminLogin)
router.get('/isAdminAuth',verifyAdminJWT ,  jwtAdminVari)
router.get('/home',applist)  


module.exports = router;