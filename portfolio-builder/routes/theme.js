const express = require('express');
const router = express.Router();
const themeController = require('../controllers/theme');

router.get('/', themeController.getAll);
router.post('/', themeController.createTheme);
router.put('/:id', themeController.updateTheme);
router.delete('/:id', themeController.deleteTheme);

module.exports = router;