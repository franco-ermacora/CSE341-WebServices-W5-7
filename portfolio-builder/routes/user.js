const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { isAuthenticated } = require('../middleware/authenticate');

// GET es público
router.get('/', userController.getAll);

// POST, PUT, DELETE requieren autenticación
router.post('/', isAuthenticated, userController.createUser);
router.put('/:id', isAuthenticated, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;