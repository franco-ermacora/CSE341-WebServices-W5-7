const express = require('express');
const router = express.Router();
const controller = require('../controllers/comment');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', controller.getAll);
router.post('/', isAuthenticated, controller.createComment);
router.put('/:id', isAuthenticated, controller.updateComment);
router.delete('/:id', isAuthenticated, controller.deleteComment);

module.exports = router;