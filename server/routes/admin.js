const {applist,adminLogin} = require("../controller/adminController")
const express = require("express")
const router = express.Router()

router.post('/login',adminLogin)
router.get('/home',applist)  


module.exports = router;