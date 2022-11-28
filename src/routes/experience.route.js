const express = require('express');
const router = express.Router();
const { insertExperience, getAllExp, detailExperience, deleteExp } = require('../controller/experience.controller');
const { protect } = require('../middleware/auth');

router.get('/', getAllExp);
router.get('/:id', detailExperience);
router.post('/create', insertExperience);
router.delete('/:id', deleteExp);

// router.get('/', protect, getAllExp);
// router.get('/:id', protect, detailExperience);
// router.post('/', protect, insertExperience);
// router.delete('/:id', protect, deleteExp);

module.exports = router