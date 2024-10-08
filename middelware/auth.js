const {getUser}  = require("../servies/auth");

function checkAuth(req , res , next) {
    const tokencokie = req.cookies?.token
    req.user = null
    if(!tokencokie)
        return next()

    const token = tokencokie
    const user = getUser(token);


    req.user = user
    next()

    
}

// async function handelloginuser(req , res , next) {
//     // console.log(req)

//     if(!useruid) return res.redirect('/login')

//     const user = await getUser(useruid)

//     if(!user)  return res.redirect('/login')

//     req.user = user

//     next();
    
// }

// async function checkauth(req , res , next) {
//     const useruid = req.cookies?.sessionstart;
//     const user = await getUser(useruid)
//     req.user = user

//     next();
// }
function restricto(roles = []){
    return function (req , res , next) {
        if(!req.user) return res.redirect('/login')
        if(!roles.includes(req.user.role)) return res.end('UnAthorized')
        return next();
    }
}




module.exports = {
    checkAuth,
    restricto,
}