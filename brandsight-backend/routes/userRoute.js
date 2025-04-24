const express = require('express');
const router = express.Router();
const { registerUser, getUserData, getHistory } = require('../controllers/userController');

router.post('/registerUser', registerUser);

router.post('/getUserData', getUserData);

router.post('/getHistory', getHistory);

module.exports = router;
