const Application = require("../models/users/application")
const jwt = require('jsonwebtoken');



const verifyAdminJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    console.log(token,"bwd")
    if (!token) {
        res.json({ message: "We need a token, please give it to us next time", auth: false });
    } else {
        jwt.verify(token, "adminToken", (err, decoded) => {
            if (err) {
                console.log(err);
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
            console.log(applist)
        }).catch(error => {
            console.log(error);
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { applist, adminLogin, jwtAdminVari, verifyAdminJWT }