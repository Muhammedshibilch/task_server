const express = require('express');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewarw/jwtMiddleware');
const educationController = require('../controllers/educationController');

const router = new express.Router();

// Register - POST
router.post('/register', userController.registerController);

// Login
router.post("/login", userController.loginController);

// Update Route
router.put('/user/edit', jwtMiddleware, userController.editUserController);

// Get user details
router.get('/profile', jwtMiddleware, userController.getUserProfile);

// Add education
router.post('/add-education', educationController.addEducationController);


router.get('/get-education', educationController.getAllEducationController);

module.exports = router;
