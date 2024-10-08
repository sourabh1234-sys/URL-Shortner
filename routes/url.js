const express = require('express');
const { anaylisurl, ggeneratenewurl, urldirect} = require('../controllers/url');
const router = express.Router();

router.post('/' , ggeneratenewurl);
router.get('/:shortid' , urldirect)
router.get('/a/:shortid' , anaylisurl)

module.exports = router


