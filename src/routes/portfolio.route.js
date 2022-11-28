const express = require('express');
const router = express.Router();
const { insertPortfolio, getAllPort, detailPortfolio, deletePorto } = require('../controller/portfolio.controller');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getAllPort);
router.get('/:id', detailPortfolio);
router.post('/create', upload, insertPortfolio);
router.delete('/:id', deletePorto);

// router.get('/', protect, getAllPort);
// router.get('/:id', protect, detailPortfolio);
// router.post('/', protect, upload, insertPortfolio);
// router.delete('/:id', protect, deletePorto);

module.exports = router