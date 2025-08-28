const express = require('express')
const Router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware');
const { addCrypto, getPortfolio, updateCrypto, deleteCrypto } = require('../controllers/portfolioController');


Router.post('/portfolio',authMiddleware,addCrypto)
Router.get('/portfolio',authMiddleware,getPortfolio)
Router.put('/portfolio/:id',authMiddleware,updateCrypto);
Router.delete('/portfolio/:id',authMiddleware,deleteCrypto);

module.exports = Router;