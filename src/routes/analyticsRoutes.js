const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const {getPortfolioMetrics} = require('../controllers/analyticsController')
const Router = express.Router();


Router.get('/analytics',authMiddleware,getPortfolioMetrics);


module.exports = Router