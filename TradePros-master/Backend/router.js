const express = require('express');
const router = express.Router();

// const interestController = require('./interestController');
// const profileController = require('./profileController');
// const forexController = require('./forexController');
const stockController = require('./stockController');
 const optionsController = require('./optionsController');
// const trendsController = require('./trendsController');
// const CommodityController = require('./CommodityController');
// const earningController = require('./earningController');
// const newsController = require('./newsController');
// const ratioController = require('./ratioController');
// const volatilityController = require('./volatilityController');

// router.get('/interests', interestController.getAllInterests);
// router.get('/forexs', forexController.getAllForexs);
// router.get('/profiles', profileController.getAllProfiles);
 router.get('/stocks', stockController.getAllStocks);
 router.get('/options', optionsController.getOptions);


module.exports = router ;
