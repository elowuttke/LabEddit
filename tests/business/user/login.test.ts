import { UserBusiness } from "../../../src/business/UserBusiness";
import { LoginSchema } from "../../../src/dtos/user/login.dto";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { HashManagerMock } from "../../mocks/HashManagerMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock";


describe("Testando LOGIN", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("Deve disparar erro se e-mail não existir", async () => {
        expect.assertions(2)
        try {
            const input = LoginSchema.parse({
                email: "semcadastro@dominio.com",
                password: "semcad123"
            })
            const output = await userBusiness.login(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("'email' ou 'password' incorretos")
            }
        }
    })

    test("Deve disparar erro se senha estiver incorreta", async () => {
        expect.assertions(2)
        try {
            const input = LoginSchema.parse({
                email: "vini@dominio.com",
                password: "errada"
            })
            const output = await userBusiness.login(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("'email' ou 'password' incorretos")
            }
        }
    })

    test("Deve gerar token ao logar", async () => {
        const input = LoginSchema.parse({
            email: "vini@dominio.com",
            password: "vini123"
        })

        const output = await userBusiness.login(input)

        expect(output).toEqual({
            message: "Login realizado com sucesso",
            token: "token-mock-vini"
        })
    })

    test("Deve gerar token ao logar", async () => {
        const input = LoginSchema.parse({
            email: "lau@dominio.com",
            password: "lau123"
        })

        const output = await userBusiness.login(input)

        expect(output).toEqual({
            message: "Login realizado com sucesso",
            token: "token-mock-lau"
        })
    })


})