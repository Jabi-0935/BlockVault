const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const {getPortfolioMetrics,getcryptos} = require('../controllers/analyticsController');
const Router = express.Router();


Router.get('/analytics',authMiddleware,getPortfolioMetrics);
Router.get('/cryptos',authMiddleware,getcryptos);


module.exports = Router