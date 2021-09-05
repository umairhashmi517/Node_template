const express = require('express');
const router = express.Router();

    
router.use('/product',require('./product.route'));
router.use('/user',require('./user.route'));

module.exports = router;