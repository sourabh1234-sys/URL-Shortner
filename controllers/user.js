const USERM = require('../models/user');
const {setUser} = require('../servies/auth');

async function userhandle(req , res) {
    const {name , email , password} = req.body
    const user = await USERM.create({
        name ,
        email,
        password
    })
    const token = setUser(user)
    res.cookie('token' , token,{httpOnly:true})

    return res.render("home")

    
}
async function userhandlelogin(req , res) {
    const {email , password} = req.body
    const user =  await USERM.findOne({email , password})
    if(!user){
        return res.redirect('/signup')
    }
    
    const token = setUser(user)
    res.cookie('token', token, { httpOnly: true });
    return res.redirect('/')
    
}

module.exports = {
    userhandle,
    userhandlelogin,
}