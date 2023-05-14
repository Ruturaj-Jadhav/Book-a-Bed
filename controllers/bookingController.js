const express = require('express');
const path = require('path');
const bookingModel = require('../models/booking');

const { type } = require('os');



// Render home page
exports.homePage = (req,res) => {
    const filePath = path.join(__dirname, ".." , 'public' , "index.html");
    res.sendFile(filePath);
};


// Availability check

exports.availabilityCheck = async (req, res) => {
    const checkIn =  req.body.checkIn;
    const checkOut = req.body.checkOut;
    const roomType = req.body.roomType;

    const availabilityCheck = await bookingModel.findOne({
        checkInDate : checkIn , checkOutDate : checkOut , roomType : roomType
    })

    console.log(availabilityCheck);

    if(availabilityCheck==null) {
        res.send({
            message : "Room Available"
        })
    }
    else{
        res.send({
            message : "Room Not Available"
        })
    }

};

// Checkin
exports.book = async (req,res) => {
   
   
}
