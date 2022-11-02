
const mongoose = require('mongoose');


const slotsBooking = new mongoose.Schema({
    slotNo: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
        required: true,
    },
    slotId: {
        type: String,
        required: true,
    },
    bookedId: {
        type: String,
        default: ''
    }
})

const Slotbook = mongoose.model('slots', slotsBooking)

module.exports = Slotbook;