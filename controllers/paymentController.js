// Imports
var express = require('express');
const Razorpay = require('razorpay')
const {nanoid} = require("nanoid");
//const orderDetail = require('../models/order-details');
const localStorage = require('local-storage');
const paymentDetail = require('../models/payment');
const PaymentDetail = require('../models/payment');

// Create an instance of RazorPay

let razorPayInstance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Create a new Order



exports.createOrder =  async function (req, res, next) {
	try {
		const params = {
			amount: req.body.amount,
			currency: "INR",
			receipt: nanoid(),
			payment_capture: "1"
		};
		const response = await razorPayInstance.orders.create(params);
		const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
		const paymentDetail = new PaymentDetail({
			orderId: response.id,
			receiptId: response.receipt,
			amount: response.amount,
			currency: response.currency,
			createdAt: response.created_at,
			status: response.status
		});
		await paymentDetail.save();
		res.render('checkout', {
			title: "Confirm Order",
			razorpayKeyId: razorpayKeyId,
			paymentDetail: paymentDetail
		});
	} catch (err) {
		console.error(err);
		res.status(500).send('Error creating order');
	}
};

// Verfiy payment

exports.verifyPayment =  async function (req, res, next) {
	body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
	let crypto = require("crypto");
	let expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
		.update(body.toString())
		.digest('hex');

	// Compare the signatures
	if (expectedSignature === req.body.razorpay_signature) {
		// if same, then find the previosuly stored record using orderId,
		// and update paymentId and signature, and set status to paid.

		const orderId = req.body.razorpay_order_id;
		await PaymentDetail.findOneAndUpdate({
				orderId: req.body.razorpay_order_id
			}, {
				paymentId: req.body.razorpay_payment_id,
				signature: req.body.razorpay_signature,
				status: "paid"
			}, {
				new: true
			},
			async function (err, doc) {
				// Throw er if failed to save
				if (err) {
					throw err
				}
                // Find the user details from DB with the help of the orderId
				const user = await paymentDetail.findOne({orderId}).lean();
				var reponse = await orderDetail.create({
					orderId: user.orderId,
					paymentId: user.paymentId,
					amount: user.amount / 100,
				})

				// Render payment success page, if saved successfully

				// res.render('pages/payment/success', {
				// 	title: "Payment verification successful",
				// 	paymentDetail: doc
				// })

                res.send({
                    message: 'Payment successful'
                })
			}
		);
	} else {

        // Render payment failure page, if not saved succeffully

		// res.render('pages/payment/fail', {
		// 	title: "Payment verification failed",
		// })

        res.send({
            message: 'Payment failed'
        })
	}
};

// Process Refund payment

exports.processRefundPayment = async function (req, res, next) {
	
     try {
	 const response = await razorPayInstance.payments.refund(req.body.paymentId,{
		"amount": req.body.amount,
		"speed": "normal",
		"receipt": "59"
	  })

	  res.send(response)
	}
	catch (err){
		res.send({
			message: err
		})
	}
};




