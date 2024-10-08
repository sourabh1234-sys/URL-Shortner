const express = require('express');
const router = express.Router();
const URL = require('../models/url')
const USERM = require('../models/user')
const {  restricto }  = require("../middelware/auth")


router.get('/admin/url' , restricto(["ADMIN"]) ,async (req , res) => {
    const allurl = await URL.find({})
    const alluser = await USERM.find({})
    return  res.render('home' , {
        urls : allurl,
        users : alluser
    })
})

router.get('/' , restricto(["NORMAL" , "ADMIN"]) , async(req , res) => {
    const allurl = await URL.find({ createby : req.user._id})
    return  res.render('home' , {
        urls : allurl,
        
    })
})

router.get('/signup' , (req , res) => {
    return  res.render('signup')
})

router.get('/login' , (req , res) => {
    return  res.render('login')
})

module.exports = router