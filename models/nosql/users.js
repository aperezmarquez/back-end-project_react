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
        city: {
            type: String,
            default: "N/A"
        },
        interests: {
            type: Array
        },
        oferts: {
            type: Boolean,
            default: false
        },
        role: {
            type: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("users", UserScheme)
