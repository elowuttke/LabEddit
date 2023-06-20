import { UserBusiness } from "../../../src/business/UserBusiness"
import { SignupSchema } from "../../../src/dtos/user/signup.dto"
import { ConflictError } from "../../../src/errors/ConflictError"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando SIGNUP", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("Deve disparar erro se nickname já existir", async () => {
        expect.assertions(2)
        try {
            const input = SignupSchema.parse({
                nickname: "Gabi",
                email: "gabriela@dominio.com",
                password: "outrasenha123"
            })
            const output = await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof ConflictError) {
                expect(error.statusCode).toBe(409)
                expect(error.message).toBe("Conflito. Esse 'nickname' já existente.")
            }
        }
    })

    test("Deve disparar erro se e-mail já existir", async () => {
        expect.assertions(2)
        try {
            const input = SignupSchema.parse({
                nickname: "Gabriela",
                email: "gabi@dominio.com",
                password: "outrasenha123"
            })
            const output = await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof ConflictError) {
                expect(error.statusCode).toBe(409)
                expect(error.message).toBe("Conflito. Esse 'email' já existente.")
            }
        }
    })

    test("Deve gerar token ao cadastrar", async () => {
        const input = SignupSchema.parse({
            nickname: "NewUser",
            email: "newuser@dominio.com",
            password: "newuser123"
        })

        const output = await userBusiness.signup(input)

        expect(output).toEqual({
            message: "Usuário cadastrado com sucesso",
            token: "token-mock"
        })
    })
})