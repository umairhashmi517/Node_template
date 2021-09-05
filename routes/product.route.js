const express = require('express');
const router = express.Router();
const product = require('../controller/product.controller');

//Created API which is necessary for development of 47,51,57 pages
router.post('/',product.create);

module.exports = router;