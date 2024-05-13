// PONEMOS EN USO TODAS LAS LIBRERIAS NPM QUE HEMOS INSTALADO
const express = require("express")
const cors = require("cors")
const morganBody = require("morgan-body")
const loggerStream = require("./utils/handleLogger")
const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./docs/swagger")
require("dotenv").config()

// CREAMOS APP DE MONGO Y LA FUNCION DBCONNECT PARA CONECTARNOS A MONGODB
const dbConnect = require("./config/mongo")
const app = express()
app.use(cors())
app.use(express.json())

// AÑADIMOS LOG DE ERRORES DE SLACK
morganBody(app, {
    noColors: true,
    skip: function(req, res) {
        return res.statusCode < 400
    },
    stream: loggerStream
})

// AÑADIMOS SWAGGER
app.use("/api-docs", 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerSpecs)
)

// ROUTE COMMERCES 
// Asignamos a la ruta /api/comercio el route de comercios que hemos creado en la carpeta routes
const commerceRoute = require("./routes/comercios")
app.use("/api/comercio", commerceRoute)

// ROUTE USER
const userRoute = require("./routes/users")
app.use("/api/user", userRoute)

//ROUTE AUTH
const authRoute = require("./routes/auth")
app.use("/api/auth", authRoute)

// ASIGNAMOS EL PUERTO
// Usamos el puerto que hemos definido en el .env para escuchar las peticiones desde este
const port = process.env.PORT

// Usamos la funcion listen para que el server escuche al puerto y se conecte a la base de datos
app.listen(port, () => {
    dbConnect()
})

module.exports = app
