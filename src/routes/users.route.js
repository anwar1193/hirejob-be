const express = require('express');
const router = express.Router();
const { getAllUsers, getAllCard, profileUser, updateUser, updatePhotoUser, deleteUser } = require('../controller/users.controller');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/profile', getAllUsers);
router.get('/card', getAllCard);
router.get('/:id', profileUser);
router.put('/:id', updateUser);
router.put('/photo/:id', upload, updatePhotoUser);
router.delete('/:id', deleteUser);

// router.get('/', protect, getAllUsers);
// router.get('/:id', protect, profileUser);
// router.put('/:id', protect, updateUser);
// router.put('/photo/:id', protect, upload, updatePhotoUser);
// router.delete('/:id', protect, deleteUser);

module.exports = router