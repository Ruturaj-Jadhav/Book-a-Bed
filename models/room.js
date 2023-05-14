const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomType : {
        type : String ,
        required : true
    } , 
    roomNumber : {
        type : Number ,
        required : true , 
        unique : true
    } ,
    roomCost : {
        type : Number ,
        required : true 
    } ,
    roomStatus : {
        type : String , 
        default : "Available"
    },
    roomBeds : {
        type : Number ,
        required : true ,
        default : 2
    }
})

const roomDetails = mongoose.model('roomDetails' , roomSchema);
 module.exports = roomDetails;