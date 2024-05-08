const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Users - Express API with Swagger (OpenAPI 3.0)",
        version: "0.1.0",
        description:
          "This is a CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "u-tad",
          url: "https://u-tad.com",
          email: "antonio.marquez@live.u-tad.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            },
        },
        schemas:{
            user: {
                type: "object",
                required: ["nombre", "mail", "password"],
                properties: {
                    nombre: {
                        type: "string",
                        example: "Menganito"
                    },
                    mail: {
                        type: "string",
                        example: "miemail@google.com"
                    },
                    password: {
                        type: "string"
                    },
                },
            },
            login: {
                type: "object",
                required: ["mail", "password"],
                properties: {
                  mail: {
                    type: "string",
                    example: "miemail@google.com"
                  },
                  password: {
                    type: "string"
                  },
                }
            },
            commerce: {
                type: "object",
                required: ["nombre", "cif", "direccion", "mail", "telefono", "id"],
                properties: {
                    nombre: {
                        type: "string",
                        example: "Ferreteria Manolo"
                    },
                    cif: {
                        type: "string",
                        example: "exampleCif"
                    },
                    direccion: {
                        type: "string",
                        example: "España"
                    },
                    mail: {
                        type: "string",
                        example: "ferremanolo@gmail.com"
                    },
                    telefono: {
                        type: "string",
                        example: "654321"
                    },
                    id: {
                        type: "integer",
                        example: 1
                    },
                }
            }
        },
      },
    },
    apis: ["./routes/*.js"],
}

module.exports = swaggerJsdoc(options)
