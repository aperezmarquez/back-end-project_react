const { handleHttpError } = require("../utils/handleError")

const checkRol = (roles) => (req, res, next) => {
    try {
        const {user} = req
        const userRol = user.role
        const checkValueRol = roles.includes(userRol)

        if (!checkValueRol) {
            handlHttoError(res, "NOT_ALLOWED_ROLE", 403)
        }
        next()
    } catch (error) {
        handleHttpError(res, "ERROR_CHECK_ROL")
    }
}

module.exports = { checkRol }
