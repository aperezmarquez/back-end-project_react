const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }
        
        const token = req.headers.authorization.split(' ').pop()
        
        if (!token || token == "Bearer") {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        const dataToken = await verifyToken(token)

        if (!dataToken.mail) {
            handleHttpError(res, "ERROR_MAIL_TOKEN", 401)
            return
        }
        next()
    } catch (error) {
        handleHttpError(res, "NOT_SESSION" + error, 401)
    }
}

module.exports = { authMiddleware }
