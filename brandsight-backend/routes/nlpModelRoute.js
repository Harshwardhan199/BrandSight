const express = require('express');
const router = express.Router();
const { analyze } = require('../controllers/nlpModelController');

router.post('/analyze', analyze);

module.exports = router;
