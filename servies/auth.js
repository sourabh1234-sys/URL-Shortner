const jwt = require('jsonwebtoken');
const secret = "sourabh"



function setUser( user) {
    const payload = {
        id: user._id,  
        email: user.email,
        role:user.role,
    };
    return jwt.sign(payload , secret)
}

function getUser(token) {
    try {
        return jwt.verify(token , secret)
    } catch (error) {
        return null;
    }
    
}

module.exports = {
    setUser,
    getUser
}