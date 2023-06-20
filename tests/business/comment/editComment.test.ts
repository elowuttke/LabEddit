import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { EditCommentSchema } from "../../../src/dtos/comment/editComment.dto"
import { ForbiddenError } from "../../../src/errors/ForbiddenError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando EDITCOMMENT", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve disparar erro se token for inválido", async () => {
        expect.assertions(2)
        try {
            const input = EditCommentSchema.parse({
                content: "Inspira, respira e não pira!",
                token: "token-mock-invalido",
                idToEdit: "id-mock-c1"
            })

            const output = await commentBusiness.editComment(input)
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                expect(error.statusCode).toBe(401)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

    test("Deve disparar erro se commentId não existir", async () => {
        expect.assertions(2)
        try {
            const input = EditCommentSchema.parse({
                content: "Inspira, respira e não pira!",
                token: "token-mock-luiz",
                idToEdit: "id-mock-invalido"
            })

            const output = await commentBusiness.editComment(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("Não foi encontrado comentáio com esse id")
            }
        }
    })

    test("Deve disparar erro se um usuário tentar editar o commentário de outro usuário", async () => {
        expect.assertions(2)
        try {
            const input = EditCommentSchema.parse({
                content: "Inspira, respira e não pira!",
                token: "token-mock-vini",
                idToEdit: "id-mock-c1"
            })

            const output = await commentBusiness.editComment(input)
        } catch (error) {
            if (error instanceof ForbiddenError) {
                expect(error.statusCode).toBe(403)
                expect(error.message).toBe("Só quem criou o comentário pode editá-lo")
            }
        }
    })

    test("Deve retornar mensagem", async () => {
        const input = EditCommentSchema.parse({
            content: "Inspira, respira e não pira!",
            token: "token-mock-luiz",
            idToEdit: "id-mock-c1"
        })

        const output = await commentBusiness.editComment(input)

        expect(output).toEqual({
            message: "Comentário editado com sucesso"
        })
    })

})