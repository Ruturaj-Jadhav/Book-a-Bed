const mongoose = require('mongoose')

const bookingSchema =  new mongoose.Schema({
    bookingId : {
        type : String ,
        required : true
    },
    roomNumber : {
        type : Number ,
        required : true
    },
    roomType : {
       type : String ,
       required : true
    },
    checkInDate : {
        type : String ,
        required : true
    },
    checkOutDate : {
        type : String ,
        required : true
    },
    bookingAmount : {
        type : Number ,
        required : true
    },
    bookingStatus : {
        type : String ,
        default : 'Completed'
    },
    paymentId : {
        type : String ,
        required : true
    }

})

const bookingDetail = mongoose.model('bookingDetail' ,bookingSchema )


module.exports = bookingDetail;