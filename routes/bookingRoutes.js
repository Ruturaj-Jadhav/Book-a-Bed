const express =  require('express');
const bookingController =  require('../controllers/bookingController')
const availabilityCheck = require("../middlewares/availabilityCheck");
const authorizationCheck = require("../middlewares/authMiddleware");
const router = express.Router();


router.get('/', bookingController.homePage);
router.post('/book',availabilityCheck.availabilityCheck ,bookingController.book);
router.post('/availabilityCheck' , bookingController.availabilityCheck);

module.exports = router;
