const Application = require("../models/users/application")
const jwt = require('jsonwebtoken');
const Slot = require('../models//admin/slot')


const verifyAdminJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
   
    if (!token) {
        res.json({ message: "We need a token, please give it to us next time", auth: false });
    } else {
        jwt.verify(token, "adminToken", (err, decoded) => {
            if (err) {
               
                res.json({ auth: false, message: "you are failed to authenticate" });
            } else {
                next();
            }
        });
    }
};


const adminLogin = async (req, res) => {
    const adminEmail = "admin@gmail.com"
    const adminPassword = "12345"

    try {
        if (adminEmail == req.body.email) {
            if (adminPassword == req.body.password) {

                const token = jwt.sign({ name: 'Admin' }, "adminToken", { expiresIn: 300 })
                console.log("token");
                console.log(token);
                res.status(200).json({ msg: false, adminToken: token, auth: true })
            } else {
                res.json({ passmsg: true, message: "Incorrect Password" })
            }
        } else {
            res.json({ emailmsg: true, message: "Incorrect Email" })
        }
    } catch (error) {
        console.log(error);
    }
}

const jwtAdminVari = (req, res) => {
    res.json({ auth: true, message: "You are authenticated Congrats" });
}
const applist = async (req, res) => {
    try {
        await Application.find({ status: "pending" }).then((applist) => {
            res.json(applist)
           
        }).catch(error => {
            console.log(error);
        })
    } catch (error) {
        console.log(error);
    }
}

const approveForm = async (req, res) => {

    try {
        await Application.findOneAndUpdate({ _id: req.params.id }, { $set: { status: "approved" } }).then((result) => {
            if (result) {
                res.status(200).json({ update: true })
            } else {
                console.log("endho pattitund")
                res.json({ update: false })
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const rejectForm = async (req, res) => {
    try {
        await Application.findByIdAndUpdate(req.params.id, { status: "rejceted" }).then((result) => {
            if (result) {
                res.status(200).json({ update: false })
            } else {
                console.log("endho pattitund")
                res.json({ update: false })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const approveList = async (req, res) => {
    try {
        await Application.find({ status: "approved" }).then((approvedlist) => {
           
            res.json(approvedlist)
        }).catch(error =>{res.json(error)})
    } catch (error) {
        console.log(error)
    }
}

const rejectedList = async (req, res) => {
    try {
        await Application.find({ status: "rejceted" }).then((rejectedlist) => {
            res.json(rejectedlist)
        }).catch(error => {res.json(error)})
    } catch (error) {
        console.log(error)
    }
}

const createSlot = async (req, res) => {
    try {
        console.log(req.body)
        
        const existSlot = await Slot.findOne({ slotNo: req.body.slotNo })
   
        if (existSlot) {
            res.status(200).json({ msg: true, message: 'slot no already exist type another' })

        } else {
            const slot = new Slot({

                slotNo: req.body.slotNo,
                slotId: req.body.slotCode,
                bookedId:''
            })
            slot.save().then((data) => {
                res.status(200).json({ msg: false, message: 'slot added SuccessFully' })
            }).catch(error => {res.json(error)})
        }
    } catch (error) {
        console.log(error)
    }
}
const showSlot = async (req, res) => {
    try {
        await Slot.find().then((result) => {
            res.status(200).json(result)
        }).catch(error=>{res.json(error)})
    } catch (error) {
        console.log(error);
    }
}
const slotBooking = async (req,res)=>{
    try { 
        console.log(req.query);
        Application.findOneAndUpdate({_id:req.query.companyId},{
            $set:{
                status:"booked"
            }
        }).then((response)=>{
            if(response){
                Slot.findOneAndUpdate({slotNo:req.query.slotId},{
                    $set:{
                        bookedId:req.query.companyId,
                        status:true
                    }
                }).then((response)=>{
                    res.status(200).json(response)
                }).catch(error=>{res.json(error)})
            }
        }).catch(error=>{res.json(error)})
    } catch (error) {
        console.log(error);
    }
}
const progress = async(req,res)=>{
    try {
        Application.find().then((response)=>{
            res.status(200).json(response)
        }).catch(error=>{res.json(error)})
    } catch (error) {
        console.log(response)
    }
}

module.exports = { applist, adminLogin, jwtAdminVari, verifyAdminJWT, approveForm, rejectForm, approveList, rejectedList, createSlot, showSlot,slotBooking ,progress}