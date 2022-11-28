const express = require('express');
const router = express.Router();
const { register, registerWork, login, refreshToken } = require('../controller/auth.controller');
const {registerValidation} = require('../validation/auth.validation');

router.post('/register', registerValidation, register);
router.post('/register-worker', registerValidation, registerWork);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

module.exports = router