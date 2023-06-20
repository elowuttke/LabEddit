import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { VoteCommentSchema } from "../../../src/dtos/comment/voteComment.dto"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando VOTECOMMENT", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve disparar erro se token for inválido", async () => {
        expect.assertions(2)
        try {
            const input = VoteCommentSchema.parse({
                commentId: "id-mock-c1",
                token: "token-mock-invalido",
                vote: true
            })

            const output = await commentBusiness.voteComment(input)
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
            const input = VoteCommentSchema.parse({
                commentId: "id-mock-invalido",
                token: "token-mock-clara",
                vote: true
            })

            const output = await commentBusiness.voteComment(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("Não foi encontrado comentário com esse id")
            }
        }
    })

    test("Deve disparar erro se um usuário tentar votar no próprio comentário", async () => {
        expect.assertions(2)
        try {
            const input = VoteCommentSchema.parse({
                commentId: "id-mock-c1",
                token: "token-mock-luiz",
                vote: true
            })

            const output = await commentBusiness.voteComment(input)
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                expect(error.statusCode).toBe(401)
                expect(error.message).toBe("Não é permitido votar em seu próprio comentário")
            }
        }
    })

    test("Deve retornar mensagem", async () => {
        const input = VoteCommentSchema.parse({
            commentId: "id-mock-c1",
            token: "token-mock-clara",
            vote: true
        })

        const output = await commentBusiness.voteComment(input)

        expect(output).toEqual({
            message: "Voto registrado com sucesso"
        })
    })
})