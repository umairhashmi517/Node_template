const express = require('express');
const router = express.Router();
const user = require('../controller/user.controller');

//Have created API which is necessary for development of 47,51,57 pages
router.post('/',user.create);

router.get('/:userId',user.get);

router.put('/:userId',user.changePermission);

module.exports = router;