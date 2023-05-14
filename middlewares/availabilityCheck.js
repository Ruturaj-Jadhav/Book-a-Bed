const express = require('express');
const bookingModel = require("../models/booking");
const path = require("path");


exports.availabilityCheck = async (req, res ,next) => {
    const checkIn =  req.body.checkin;
    const checkOut = req.body.checkout;
    const roomType = req.body.roomType;

    console.log(checkIn)

    const availabilityCheck = await bookingModel.findOne({
        checkInDate : checkIn
    }).lean();

    console.log(availabilityCheck);

    if(availabilityCheck==null) {
        
            req.roomData = {
                checkIn : checkIn,
                checkOut : checkOut,
                roomType : roomType
            }
            next();
    }

    else{
        res.send({
            message : "Room is not available"
        })
    }

};