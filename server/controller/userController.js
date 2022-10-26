const app = require("../app")
const User = require("../models/users/register")
const bcrypt = require('bcrypt')
const Application = require("../models/users/application")
const jwt = require('jsonwebtoken');


const postSignUp = async (req, res) => {
    try {
        let mailId = await User.findOne({ email: req.body.email })
        if (!mailId) {
            console.log(req.body);
            const securedPassword = await bcrypt.hash(req.body.password, 10)
            console.log(securedPassword, "uhdefey")
            const signedUpUser = new User({
                name: req.body.userName,
                email: req.body.email,
                phone: req.body.phone,
                password: securedPassword
            })
            signedUpUser.save().then((data) => {    
                res.status(200).json(data)
            }).catch(error => {
                console.log('catch error');
                console.log(error.message);
            })
        } else {
            res.json({ msg: true })
        }
    } catch (error) {
        console.log(error.messsage)
    }
}


/* ------------------------------- post signup ------------------------------ */
const postSignIn = async (req, res) => {
    try {
        let { email, password } = req.body

        let user = await User.findOne({ email: email })
        if (user) {
            const pass = await bcrypt.compare(password, user.password)
            if (pass) {
                const token = jwt.sign({user}, "jwtSecret", {expiresIn: 300})

                res.status(200).json({ msg: false, token: token, auth: true })
            } else {
                res.json({ msg: true, message: "Invalid Password" })
            }
        } else {
            res.json({ msg: true, message: "Invalid Mail or Ur mail is not registered" })
        }
    } catch (error) {
        console.log(error.message)
    }
}

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.json({message: "We need a token, please give it to us next time", auth: false});
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ auth: false, message: "you are failed to authenticate"});
            } else {
                next();
            }
        });
    }
};


const jwtVari =  (req, res) => {
    res.json({ auth: true, message: "You are authenticated Congrats"});
}


/* ----------------------------- postapplication ---------------------------- */
const postApp = async (req, res) => {
    try {
        console.log(req.body);
        const application = new Application({
            name: req.body.Uname,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            email: req.body.email,
            phone: req.body.phone,
            company: req.body.company,
            incubation: req.body.incubation,
            status:"pending"
        })
        application.save().then((data) => {
            res.status(200).json(data)
        }).catch(error => {
            console.log('catch error');
            console.log(error.message);
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { postSignUp, postSignIn, postApp, jwtVari, verifyJWT }