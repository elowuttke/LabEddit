import { UserBusiness } from "../../../src/business/UserBusiness"
import { GetUsersSchema } from "../../../src/dtos/user/getUsers.dto"
import { ForbiddenError } from "../../../src/errors/ForbiddenError"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { USER_ROLES } from "../../../src/models/User"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando GETUSERS", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("Deve retornar toda lista users", async () => {
        const input = GetUsersSchema.parse({
            token: "token-mock-lau",
        })

        const output = await userBusiness.getUsers(input)

        expect(output).toHaveLength(7)
        expect(output).toEqual([
            {
                id: "id-mock-lau",
                nickname: "Lau",
                email: "lau@dominio.com",
                role: USER_ROLES.ADMIN,
                createdAt: expect.any(String)
            },
            {
                id: "id-mock-yuzo",
                nickname: "Yuzo",
                email: "yuzo@dominio.com",
                role: USER_ROLES.USER,
                createdAt: expect.any(String)
            },
            {
                id: "id-mock-vini",
                nickname: "Vini",
                email: "vini@dominio.com",
                role: USER_ROLES.USER,
                createdAt: expect.any(String)
            },
            {
                id: "id-mock-gabi",
                nickname: "Gabi",
                email: "gabi@dominio.com",
                role: USER_ROLES.USER,
                createdAt: expect.any(String)
            },
            {
                id: "id-mock-clara",
                nickname: "Clara",
                email: "clara@dominio.com",
                role: USER_ROLES.USER,
                createdAt: expect.any(String)
            },
            {
                id: "id-mock-luiz",
                nickname: "Luiz",
                email: "luiz@dominio.com",
                role: USER_ROLES.USER,
                createdAt: expect.any(String)
            },
            {
                id: "id-mock-jessica",
                nickname: "Jessica",
                email: "jessica@dominio.com",
                role: USER_ROLES.USER,
                createdAt: expect.any(String)
            }
        ])
    })

    test("Deve disparar erro se token for inválido", async () => {
        expect.assertions(2)
        try {
            const input = GetUsersSchema.parse({
                token: "token-invalido"
            })

            const output = await userBusiness.getUsers(input)
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                expect(error.statusCode).toBe(401)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

    test("Deve disparar erro de token !== ADMIN", async () => {
        expect.assertions(2)
        try {
            const input = GetUsersSchema.parse({
                token: "token-mock-yuzo" // Yuzo é USER, não ADMIN
            })
            const output = await userBusiness.getUsers(input)
        } catch (error) {
            if (error instanceof ForbiddenError) {
                expect(error.statusCode).toBe(403)
                expect(error.message).toBe("Token válido, mas sem permissões suficientes")
            }
        }
    })
})