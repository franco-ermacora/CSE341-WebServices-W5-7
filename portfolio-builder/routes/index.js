const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/auth', require('./auth')); // <-- ESTA LÍNEA ES NECESARIA
router.use('/user', require('./user'));
router.use('/theme', require('./theme'));
router.use('/project', require('./projects'));
router.use('/comment', require('./comments'));

module.exports = router;