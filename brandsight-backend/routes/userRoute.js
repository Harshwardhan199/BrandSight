const express = require('express');
const router = express.Router();
const { registerUser, getUserData } = require('../controllers/userController');

router.post('/registerUser', registerUser);

router.post('/getUserData', getUserData);

module.exports = router;
