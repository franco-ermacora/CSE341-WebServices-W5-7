const express = require('express');
const router = express.Router();
const controller = require('../controllers/project');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', controller.getAll);
router.post('/', isAuthenticated, controller.createProject);
router.put('/:id', isAuthenticated, controller.updateProject);
router.delete('/:id', isAuthenticated, controller.deleteProject);

module.exports = router;