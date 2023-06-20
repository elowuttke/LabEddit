import { PostBusiness } from "../../../src/business/PostBusiness"
import { EditPostSchema } from "../../../src/dtos/post/editPost.dto"
import { ForbiddenError } from "../../../src/errors/ForbiddenError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando EDITPOST", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve disparar erro se token for inválido", async () => {
        expect.assertions(2)
        try {
            const input = EditPostSchema.parse({
                content: "Adoro bugs, alguém tem um bug aí pra mim?",
                token: "token-mock-invalido",
                idToEdit: "id-mock-p3"
            })

            const output = await postBusiness.editPost(input)
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
            const input = EditPostSchema.parse({
                content: "Adoro bugs, alguém tem um bug aí pra mim?",
                token: "token-mock-clara",
                idToEdit: "id-mock-invalido"
            })

            const output = await postBusiness.editPost(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("Não foi encontrado post com esse id")
            }
        }
    })

    test("Deve disparar erro se um usuário tentar editar o post de outro usuário", async () => {
        expect.assertions(2)
        try {
            const input = EditPostSchema.parse({
                content: "Adoro bugs, alguém tem um bug aí pra mim?",
                token: "token-mock-vini",
                idToEdit: "id-mock-p3"
            })

            const output = await postBusiness.editPost(input)
        } catch (error) {
            if (error instanceof ForbiddenError) {
                expect(error.statusCode).toBe(403)
                expect(error.message).toBe("Só quem criou o post pode editá-lo")
            }
        }
    })

    test("Deve retornar mensagem", async () => {
        const input = EditPostSchema.parse({
            content: "Adoro bugs, alguém tem um bug aí pra mim?",
            token: "token-mock-clara",
            idToEdit: "id-mock-p3"
        })

        const output = await postBusiness.editPost(input)

        expect(output).toEqual({
            message: "Post editado com sucesso"
        })
    })

})