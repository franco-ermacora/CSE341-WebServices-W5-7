const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/user', require('./user'));
router.use('/theme', require('./theme'));

module.exports = router;