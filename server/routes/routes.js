const express = require('express');
const path = require('path');

const searchController = require('../controllers/searchController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', searchController.ping);
router.get('/search', searchController.getNearestRestaurants);
router.post('/sessionLogin', authController.handleLogin);

module.exports = router;
