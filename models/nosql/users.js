const mongoose = require('mongoose')
const UserScheme = new mongoose.Schema(
    {
        nombre: {
            type: String
        },
        mail: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        role: {
            type: ["user", "admin", "commerce"],
            default: "user"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("users", UserScheme)
