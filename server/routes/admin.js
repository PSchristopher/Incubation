const {applist,adminLogin, jwtAdminVari, verifyAdminJWT,approveForm,rejectForm,approveList,rejectedList,createSlot,showSlot,slotBooking,progress} = require("../controller/adminController")
const express = require("express")
const router = express.Router()

router.post('/login',adminLogin)
router.get('/isAdminAuth',verifyAdminJWT ,  jwtAdminVari)
router.get('/home',applist) 
router.post('/approve/:id',approveForm) 
router.post('/reject/:id',rejectForm) 
router.get('/approved',approveList) 
router.get('/rejected',rejectedList) 
router.post('/create_slot',createSlot) 
router.get('/showSlots',showSlot) 
router.get('/slotBooking',slotBooking) 
router.get('/progress',progress) 



module.exports = router;