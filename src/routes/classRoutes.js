const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const auth = require('../middlewares/auth');

router.post('/', auth, classController.create);
router.get('/', auth, classController.getAll);
router.post('/join', auth, classController.join);
router.get('/:id', auth, classController.getById);
router.get('/:id/members', auth, classController.members);

module.exports = router;
