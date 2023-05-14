const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String ,
        required : true
    },
    firstName: { 
          type: String
        , required: true },
    lastName: { 
        type: String, 
        required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true },
    phone: { 
        type: String,
        required: true },
    city: { 
        type: String,
        required: true },
    country: { 
        type: String,
        required: true },
    zipCode: { 
        type: String,
        required: true },

}
)

const Usermodel = mongoose.model('Usermodel', UserSchema);

module.exports = Usermodel;