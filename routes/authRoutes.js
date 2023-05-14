// Imports
const express = require('express');
const authorizationController = require('../controllers/authorizationController');
var router = express.Router();

// Routes
router.get('/' , authorizationController.registerPage);

router.get('/login', authorizationController.loginPage);

router.post('/register', authorizationController.register)

router.post('/login' , authorizationController.login);

module.exports = router;

