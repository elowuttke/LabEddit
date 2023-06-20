import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { DeleteCommentSchema } from "../../../src/dtos/comment/deleteComment.dto"
import { ForbiddenError } from "../../../src/errors/ForbiddenError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando DELETECOMMENT", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve disparar erro se token for inválido", async () => {
        expect.assertions(2)
        try {
            const input = DeleteCommentSchema.parse({
                token: "token-invalido",
                idToDelete: "id-mock-c1"
            })

            const output = await commentBusiness.deleteComment(input)
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
            const input = DeleteCommentSchema.parse({
                token: "token-mock-luiz",
                idToDelete: "id-mock-invalido"
            })

            const output = await commentBusiness.deleteComment(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("Não foi encontrado comentário com esse id")
            }
        }
    })

    test("Deve disparar erro se um usuário tentar deletar o comentário de outro usuário", async () => {
        expect.assertions(2)
        try {
            const input = DeleteCommentSchema.parse({
                token: "token-mock-yuzo",
                idToDelete: "id-mock-c1"
            })

            const output = await commentBusiness.deleteComment(input)
        } catch (error) {
            if (error instanceof ForbiddenError) {
                expect(error.statusCode).toBe(403)
                expect(error.message).toBe("Só quem criou o comentário pode deletá-lo")
            }
        }
    })

    test("Usuário ADMIN deve poder deletar comentário de qualquer usuário", async () => {
        const input = DeleteCommentSchema.parse({
            token: "token-mock-lau",
            idToDelete: "id-mock-c1"
        })

        const output = await commentBusiness.deleteComment(input)

        expect(output).toEqual({
            message: "Comentário deletado com sucesso"
        })
    })

    test("Deve retornar mensagem", async () => {
        const input = DeleteCommentSchema.parse({
            token: "token-mock-luiz",
            idToDelete: "id-mock-c1"
        })

        const output = await commentBusiness.deleteComment(input)

        expect(output).toEqual({
            message: "Comentário deletado com sucesso"
        })
    })
})