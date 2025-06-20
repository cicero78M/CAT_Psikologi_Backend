const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const questionRoutes = require('./questionRoutes');
const questionBankRoutes = require('./questionBankRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/questions', questionRoutes);
router.use('/question-banks', questionBankRoutes);

module.exports = router;
