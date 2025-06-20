const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const questionRoutes = require('./questionRoutes');
const questionBankRoutes = require('./questionBankRoutes');
const classRoutes = require('./classRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/questions', questionRoutes);
router.use('/question-banks', questionBankRoutes);
router.use('/classes', classRoutes);

module.exports = router;
