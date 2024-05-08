const bcryptjs = require("bcryptjs")
const encrypt = async (clearPassword) => {
    const hash = await bcryptjs.hash(clearPassword, 10)
    return hash
}

const compare = async (clearPassword, hashPassword) => {
    const result = await bcryptjs.compare(clearPassword, hashPassword)
    return result
}

module.exports = { encrypt, compare }
