const mongoose = require('mongoose')

const applicationForm = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    email: String,
    phone: String,
    company: String,
    status: String,
    incubation: String,
     userId:mongoose.Types.ObjectId
})
const applicationmodel = mongoose.model('application', applicationForm)

module.exports = applicationmodel