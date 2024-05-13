const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
const handleHttpError = require("./handleError")


const tokenSign = (user) => {
    const sign = jwt.sign({
        mail: user.mail,
        role: user.role
    },
    JWT_SECRET,
    {
        expiresIn: "2h"
    })
    
    if (!sign) {
        handleHttpError("TOKEN_NOT_SIGNED", 500)
    }

    return sign
}

const verifyToken = (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (error) {
        handleHttpError("TOKEN_NOT_VALID", 500)
    }
}

module.exports = { tokenSign, verifyToken }
