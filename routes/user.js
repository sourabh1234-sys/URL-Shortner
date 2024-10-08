const express = require('express');
const {userhandle, userhandlelogin }  = require('../controllers/user');
const router = express.Router();

router.post('/singup' , userhandle)
router.post('/login' , userhandlelogin)

module.exports = router
