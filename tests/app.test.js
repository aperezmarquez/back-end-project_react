const request = require("supertest")
const app = require("../app")

var tokenU = ""
var tokenC = ""

describe("Users Tests", () => {
    
    var mail = ""

    it("should register a user", async() => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({"nombre": "JoseLu", "mail": "jose@gmail.com", "password": "123456789", "city": "Roma", "role": ['admin']})
            .set("Accept", "application/json")
            .expect(200)

        expect(response.body.user.mail).toEqual("jose@gmail.com")
    })
  
    it("should login a user", async() => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({"mail": "jose@gmail.com", "password": "123456789"})
            .set("Accept", "application/json")
            .expect(200)

        expect(response.body.user.mail).toEqual("jose@gmail.com")
        mail = response.body.user.mail
        tokenU = response.body.token
    })

    it("should not login a user", async() => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({"mail": "mailmalo@gmail.com", "password": "incorrecta"})
            .set("Accept", "application/json")
            .expect(404)  
    })

    it("should get all users", async() => {
        const response = await request(app)
            .get("/api/auth/users")
            .set('Authorization', `Bearer ${tokenU}`)
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.data.pop().mail).toEqual("jose@gmail.com")
    })

    it("should update a user", async() => {
        const response = await request(app)
            .patch("/api/auth/users/"+mail)
            .set('Authorization', `Bearer ${tokenU}`)
            .send({"oferts": true})
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.data.oferts).toEqual(true)
    })

    it("should not update a user, var does not exist", async() => {
        const response = await request(app)
            .patch("/api/auth/users/"+mail)
            .send({"example": "error"})
            .set('Authorization', `Bearer ${tokenU}`)
            .set("Accept", "application/json")
            .expect(200)

        expect(response.body.data.example).toEqual(undefined)
    })

    it("should not update a user, wrong mail", async() => {
        const response = await request(app)
            .patch("/api/auth/users/error@gmail.com")
            .set('Authorization', `Bearer ${tokenU}`)
            .send({"nombre": "Juan Carlos"})
            .set("Accept", "application/json")
            .expect(403)
    })

    it("should delete a user", async() => {
        const response = await request(app)
            .delete("/api/auth/users/"+mail)
            .set('Authorization', `Bearer ${tokenU}`)
            .set("Accept", "application/json")
            .expect(200)
    })
})

describe("Comercios Tests", () => {

    var cif = ""

    it("should create a commerce", async() => {
        const response = await request(app)
            .post("/api/comercio/")
            .set('Authorization', `Bearer ${tokenU}`)
            .send({"nombre": "Ferrari", "cif": "cifExamp", "password": "123456789", "direccion": "Espana", "mail": "ferrari@fe.com", "telefono": "123456789", "city": "Roma", "id": 2})
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.comercio.mail).toEqual("ferrari@fe.com")
        expect(response.body.comercio.cif).toEqual("cifExamp")
        expect(response.body.comercio.direccion).toEqual("Espana")
        expect(response.body.comercio.telefono).toEqual("123456789")

        cif = response.body.comercio.cif
    })

    it("should give an error, commerce already exists", async() => {
        const response = await request(app)
            .post("/api/comercio/")
            .set('Authorization', `Bearer ${tokenU}`)
            .send({"nombre": "Ferrari", "cif": "cifExamp", "password": "123456789", "direccion": "Espana", "mail": "ferrari@fe.com", "telefono": "123456789", "id": 2})
            .set("Accept", "application/json")
            .expect(403)
    })

    it("should give an error, cif must exists and not be empty", async() => {
        const response = await request(app)
            .post("/api/comercio/")
            .set('Authorization', `Bearer ${tokenU}`)
            .send({"nombre": "Ford", "password": "123456789", "direccion": "Espana", "mail": "ford@ford.com", "telefono": "234567890", "id": 3})
            .set("Accept", "application/json")
            .expect(403)
    })

    it("should login a commerce", async() => {
        const response = await request(app)
            .post("/api/comercio/login")
            .send({"cif": "cifExamp", "password": "123456789"})
            .set("Accept", "application/json")
            .expect(200)

        tokenC = response.body.token
    })

    it("shouldn't login a commerce, cif doesn't exist", async() => {
        const response = await request(app)
            .post("/api/comercio/login")
            .send({"cif": "cifError", "password": "123456789"})
            .set("Accept", "application/json")
            .expect(404)
    })

    it("should get the commerces", async() => {
        const response = await request(app)
            .get("/api/comercio/")
            .set("Accept", "application/json")
            .expect(200)

        var object = response.body.pop()
        expect(object.nombre).toEqual("Ferrari")
    })

    it("should get the users in the city of the commerce", async() => {
        const response = await request(app)
            .get("/api/comercio/interests")
            .set("Authorization", `Bearer ${tokenC}`)
            .set("Accept", "application/json")
            .expect(200)
    })

    it("should update the commerce", async() => {
        const response = await request(app)
            .patch("/api/comercio/"+cif)
            .set('Authorization', `Bearer ${tokenC}`)
            .send({"direccion": "Italia"})
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.direccion).toEqual("Italia")
    })

    it("should not update, this var doesn't exist", async() => {
        const response = await request(app)
            .patch("/api/comercio/"+cif)
            .set('Authorization', `Bearer ${tokenC}`)
            .send({"example": "error"})
            .set("Accept", "application/json")
            .expect(200)

        expect(response.body.example).toEqual(undefined)
    })

    it("should get all the oferts", async() => {
        const response = await request(app)
            .get("/api/auth/users/oferts")
            .set('Authorization', `Bearer ${tokenU}`)
            .send({"city": "Roma"})
            .set("Accept", "application/json")
            .expect(200)
    })

    it("should delete the commerce", async() => {
        const response = await request(app)
            .delete("/api/comercio/"+cif)
            .set('Authorization', `Bearer ${tokenC}`)
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.mail).toEqual("ferrari@fe.com")
    })
})
