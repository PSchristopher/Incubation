const Application = require("../models/users/application")




const   adminLogin = async (req, res) => {
    const adminEmail = "admin@gmail.com"
    const adminPassword = "12345"
   
    try {
        if (adminEmail == req.body.email) {
            if (adminPassword == req.body.password) {
                res.json({ msg: false })
            } else {
                res.json({passmsg: true, message: "Incorrect Password" })
            }
        } else {
            res.json({ emailmsg: true, message: "Incorrect Email" })
        }
    } catch (error) {
        console.log(error);
    }
}
const applist = async (req, res) => {
    try {
        await Application.find({ status: "pending" }).then((applist) => {
            res.json(applist)
            console.log(applist)
        }).catch(error => {
            console.log(error);
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { applist, adminLogin}