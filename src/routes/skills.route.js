const express = require('express');
const router = express.Router();
const { insertSkill, getAllSkill, detailSkill } = require('../controller/skills.controller');
const { protect } = require('../middleware/auth');

router.get('/', getAllSkill);
router.get('/:id', detailSkill);
router.post('/create', insertSkill);

// router.get('/', protect, getAllSkill);
// router.get('/:id', protect, detailSkill);
// router.post('/', protect, insertSkill);

module.exports = router;