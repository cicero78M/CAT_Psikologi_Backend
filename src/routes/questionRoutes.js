const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const auth = require('../middlewares/auth');

router.post('/', auth, questionController.create);
router.get('/', auth, questionController.getAll);
router.get('/:id', auth, questionController.getById);

module.exports = router;
