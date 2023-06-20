import { PostBusiness } from "../../../src/business/PostBusiness"
import { DeletePostSchema } from "../../../src/dtos/post/deletePost.dto"
import { ForbiddenError } from "../../../src/errors/ForbiddenError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando DELETEPOST", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve disparar erro se token for inválido", async () => {
        expect.assertions(2)
        try {
            const input = DeletePostSchema.parse({
                token: "token-invalido",
                idToDelete: "id-mock-p4"
            })

            const output = await postBusiness.deletePost(input)
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                expect(error.statusCode).toBe(401)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

    test("Deve disparar erro se postId não existir", async () => {
        expect.assertions(2)
        try {
            const input = DeletePostSchema.parse({
                token: "token-mock-yuzo",
                idToDelete: "id-mock-invalido"
            })

            const output = await postBusiness.deletePost(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("post com esse id não existe")
            }
        }
    })

    test("Deve disparar erro se um usuário tentar deletar o post de outro usuário", async () => {
        expect.assertions(2)
        try {
            const input = DeletePostSchema.parse({
                token: "token-mock-clara",
                idToDelete: "id-mock-p4"
            })

            const output = await postBusiness.deletePost(input)
        } catch (error) {
            if (error instanceof ForbiddenError) {
                expect(error.statusCode).toBe(403)
                expect(error.message).toBe("Só quem criou o post pode deletá-lo")
            }
        }
    })

    test("Usuário ADMIN deve poder deletar post de qualquer usuário", async () => {
        const input = DeletePostSchema.parse({
            token: "token-mock-lau",
            idToDelete: "id-mock-p4"
        })

        const output = await postBusiness.deletePost(input)

        expect(output).toEqual({
            message: "Post deletado com sucesso"
        })
    })

    test("Deve retornar mensagem", async () => {
        const input = DeletePostSchema.parse({
            token: "token-mock-yuzo",
            idToDelete: "id-mock-p4"
        })

        const output = await postBusiness.deletePost(input)

        expect(output).toEqual({
            message: "Post deletado com sucesso"
        })
    })

})