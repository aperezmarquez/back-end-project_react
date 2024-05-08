// AÑADIMOS TODOS LOS MODELOS
// Para poder acceder a todos ellos desde un unico punto
const models = {
    usersModel: require('./nosql/users'),
    commerceModel: require('./nosql/comercios')
}

module.exports = models
