const userSignupController = require('../controller/userSignupController');
const userSigninContrller = require('../controller/userSigninController');
const express = require('express');
const route = express.Router();


route.post('/signup',userSignupController.signup);
route.post('/signin',userSigninContrller.signin);


module.exports = route;