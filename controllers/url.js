const shortid = require('shortid');
const URL = require('../models/url')

async function ggeneratenewurl(req , res) {
    const body = req.body
    if(!body.url) return res.status(400).json({error:"url uplod first"});
    const shorturl = shortid(9)
    await URL.create({
        shortid: shorturl,
        newshorturl: body.url,
        vistihistory: [],
        createby: req.user._id
    })
    return res.render("home" , {
        id : shorturl,
        ur : body.url
    })
    // return res.json({id:shorturl})
}

async function urldirect(req , res) {
    const shortid = req.params.shortid;
    const entery = await URL.findOneAndUpdate({
        shortid
    }, {$push: {
        vistihistory : {
            timestamp : Date.now()
        }
    }})
    if (entery) {
        console.log("entry found:", entery); 
        return res.redirect(entery.newshorturl); 
    } else {
        console.log("No entry found for shortid:", shortid);
        return res.status(404).json({ error: "URL not found" });
    }
}

async function anaylisurl(req , res) {
    const shortid = req.params.shortid
    const ans = await URL.findOne({ shortid })
    return res.render("home" )


}

module.exports = {
    ggeneratenewurl,
    urldirect,
    anaylisurl,
}