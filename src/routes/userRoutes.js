const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.get('/', auth, userController.getAll);
router.get('/:id', auth, userController.getById);
router.put('/:id', auth, userController.update);

module.exports = router;
