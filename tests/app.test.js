const request = require("supertest")
const app = require("../app")

describe("comercios", () => {

    var token = ""
    var mail = ""

    it("should register a commerce", async() => {
        const response = await request(app)
            .post("/api/comercio/")
            .send({"nombre": "Ferrari", "cif": "cifExamp", "direccion": "Espana", "mail": "ferrari@fe.com", "telefono": "123456789", "id": 2})
            .set("Accept", "application/json")
            .expect(200)

        expect(response.body.comercio.mail).toEqual("ferrari@fe.com")
        expect(response.body.comercio.cif).toEqual("cifExamp")
        expect(response.body.comercio.direccion).toEqual("Italia")
        expect(response.body.comercio.telefono).toEqual("123456789")

        token = response.body.token
        mail = response.body.comercio.mail
    })

    it("should get the commerces", async() => {
        const response = await request(app)
            .get("/api/comercio/")
            .auth(token, {type: bearer})
            .set("Accept", "application/json")
            .expect(200)

        expect(responso.body.pop().nombre).toEqual("Ferrari")
    })

    it("should update the commerce", async() => {
        const response = await request(app)
            .patch("/api/comercio/"+mail)
            .send({"direccion": "Italia"})
            .set("Accept", "application/json")
            .expect(200)

        expect(response.body.comercio.direccion).toEqual("Italia")
    })

    it("should delete the commerce", async() => {
        const response = await request(app)
            .delete("/api/comercio/"+mail)
            .auth(token, {type: bearer})
            .set("Accept", "application/json")
            .expect(200)

        expect(response.body.acknowledged).toEqual(true)
    })
})
