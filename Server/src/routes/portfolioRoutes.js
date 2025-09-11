const express = require('express')
const Router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware');
const { addCrypto, getPortfolio, updateCrypto, deleteCrypto ,getTransacations} = require('../controllers/portfolioController');


Router.post('/portfolio',authMiddleware,addCrypto)
Router.get('/portfolio',authMiddleware,getPortfolio)
Router.put('/portfolio/:id',authMiddleware,updateCrypto);
Router.delete('/portfolio/:id',authMiddleware,deleteCrypto);
Router.get('/transaction',authMiddleware,getTransacations)

module.exports = Router;