// Imports
var express = require('express');
var router = express.Router();
const paymentController = require('../controllers/paymentController');

// Routes
router.get('/' , (req,res) => {
    console.log("working...");
});
router.post('/order' ,paymentController.createOrder);
router.post('/verify',paymentController.verifyPayment);
router.post('/refund',paymentController.processRefundPayment);

module.exports = router;