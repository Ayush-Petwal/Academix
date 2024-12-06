const express = require('express');
const router = express.Router();
const {register, login, logout, getUserProfile, updateProfile} = require('../controllers/userController');
const { default: isAuth } = require('../middlewares/isAuth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', isAuth , getUserProfile)
router.put('/profile/update', isAuth , updateProfile) 

module.exports = router;
