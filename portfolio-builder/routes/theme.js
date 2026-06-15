const express = require('express');
const router = express.Router();
const themeController = require('../controllers/theme');
const { isAuthenticated } = require('../middleware/authenticate');

// GET es público
router.get('/', themeController.getAll);

// POST, PUT, DELETE requieren autenticación
router.post('/', isAuthenticated, themeController.createTheme);
router.put('/:id', isAuthenticated, themeController.updateTheme);
router.delete('/:id', isAuthenticated, themeController.deleteTheme);

module.exports = router;