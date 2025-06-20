const express = require('express');
const router = express.Router();
const bankController = require('../controllers/questionBankController');
const auth = require('../middlewares/auth');

router.post('/', auth, bankController.create);
router.get('/', auth, bankController.getAll);
router.get('/:id', auth, bankController.getById);

module.exports = router;
