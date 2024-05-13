const request = require("supertest")
const app = require("../app")

describe("users", () => {
    
    var mail = ""

    it("should register a user", async() => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({"nombre": "JoseLu", "mail": "jose@gmail.com", "password": "123456789"})
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
    })
})

describe("comercios", () => {

    var cif = ""

    it("should create a commerce", async() => {
        const response = await request(app)
            .post("/api/comercio/")
            .send({"nombre": "Ferrari", "cif": "cifExamp", "direccion": "Espana", "mail": "ferrari@fe.com", "telefono": "123456789", "id": 2})
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
            .send({"nombre": "Ferrari", "cif": "cifExamp", "direccion": "Espana", "mail": "ferrari@fe.com", "telefono": "123456789", "id": 2})
            .set("Accept", "application/json")
            .expect(403)
    })

    it("should give an error, cif must exists and not be empty", async() => {
        const response = await request(app)
            .post("/api/comercio/")
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
            .send({"direccion": "Italia"})
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.direccion).toEqual("Italia")
    })

    it("should not update, this var doesn't exist", async() => {
        const response = await request(app)
            .patch("/api/comercio/"+cif)
            .send({"example": "error"})
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.example).toEqual(undefined)
    })

    it("should delete the commerce", async() => {
        const response = await request(app)
            .delete("/api/comercio/"+cif)
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.mail).toEqual("ferrari@fe.com")
    })
})
