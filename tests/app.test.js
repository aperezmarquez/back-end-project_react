const request = require("supertest")
const app = require("../app")

var token = ""

describe("Users Tests", () => {
    
    var mail = ""

    it("should register a user", async() => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({"nombre": "JoseLu", "mail": "jose@gmail.com", "password": "123456789", "role": ['admin']})
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
        token = response.body.token
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
            .set('Authorization', `Bearer ${token}`)
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.data.pop().mail).toEqual("jose@gmail.com")
    })

    it("should update a user", async() => {
        const response = await request(app)
            .patch("/api/auth/users/"+mail)
            .set('Authorization', `Bearer ${token}`)
            .send({"oferts": true})
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.data.oferts).toEqual(true)
    })

    it("should not update a user, var does not exist", async() => {
        const response = await request(app)
            .patch("/api/auth/users/"+mail)
            .send({"example": "error"})
            .set('Authorization', `Bearer ${token}`)
            .set("Accept", "application/json")
            .expect(200)

        expect(response.body.data.example).toEqual(undefined)
    })

    it("should not update a user, wrong mail", async() => {
        const response = await request(app)
            .patch("/api/auth/users/error@gmail.com")
            .set('Authorization', `Bearer ${token}`)
            .send({"nombre": "Juan Carlos"})
            .set("Accept", "application/json")
            .expect(403)
    })

    it("should delete a user", async() => {
        const response = await request(app)
            .delete("/api/auth/users/"+mail)
            .set('Authorization', `Bearer ${token}`)
            .set("Accept", "application/json")
            .expect(200)
    })
})

describe("Comercios Tests", () => {

    var cif = ""

    it("should create a commerce", async() => {
        const response = await request(app)
            .post("/api/comercio/")
            .set('Authorization', `Bearer ${token}`)
            .send({"nombre": "Ferrari", "cif": "cifExamp", "direccion": "Espana", "mail": "ferrari@fe.com", "telefono": "123456789", "city": "Roma", "id": 2})
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.mail).toEqual("ferrari@fe.com")
        expect(response.body.cif).toEqual("cifExamp")
        expect(response.body.direccion).toEqual("Espana")
        expect(response.body.telefono).toEqual("123456789")

        cif = response.body.cif
    })

    it("should give an error, commerce already exists", async() => {
        const response = await request(app)
            .post("/api/comercio/")
            .set('Authorization', `Bearer ${token}`)
            .send({"nombre": "Ferrari", "cif": "cifExamp", "direccion": "Espana", "mail": "ferrari@fe.com", "telefono": "123456789", "id": 2})
            .set("Accept", "application/json")
            .expect(403)
    })

    it("should give an error, cif must exists and not be empty", async() => {
        const response = await request(app)
            .post("/api/comercio/")
            .set('Authorization', `Bearer ${token}`)
            .send({"nombre": "Ford", "direccion": "Espana", "mail": "ford@ford.com", "telefono": "234567890", "id": 3})
            .set("Accept", "application/json")
            .expect(403)
    })

    it("should get the commerces", async() => {
        const response = await request(app)
            .get("/api/comercio/")
            .set("Accept", "application/json")
            .expect(200)

        expect(response.body.pop().nombre).toEqual("Ferrari")
    })

    it("should update the commerce", async() => {
        const response = await request(app)
            .patch("/api/comercio/"+cif)
            .set('Authorization', `Bearer ${token}`)
            .send({"direccion": "Italia"})
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.direccion).toEqual("Italia")
    })

    it("should not update, this var doesn't exist", async() => {
        const response = await request(app)
            .patch("/api/comercio/"+cif)
            .set('Authorization', `Bearer ${token}`)
            .send({"example": "error"})
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.example).toEqual(undefined)
    })

    it("should delete the commerce", async() => {
        const response = await request(app)
            .delete("/api/comercio/"+cif)
            .set('Authorization', `Bearer ${token}`)
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.mail).toEqual("ferrari@fe.com")
    })
})
