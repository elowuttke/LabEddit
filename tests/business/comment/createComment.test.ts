import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { CreateCommentSchema } from "../../../src/dtos/comment/createComment.dto"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { NotFoundError } from "../../../src/errors/NotFoundError"


describe("Testando CREATECOMMENT", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve disparar erro se token for inválido", async () => {
        expect.assertions(2)
        try {
            const input = CreateCommentSchema.parse({
                postId: "id-mock-p1",
                content: "Aqui vai o comentário novo a ser publicado!",
                token: "token-invalido"
            })

            const output = await commentBusiness.createComment(input)
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
            const input = CreateCommentSchema.parse({
                postId: "id-invalido",
                content: "Aqui vai o comentário novo a ser publicado!",
                token: "token-mock-luiz"
            })

            const output = await commentBusiness.createComment(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("Não existe Post com esse 'PostId'")
            }
        }
    })

    test("Deve retornar mensagem", async () => {
        const input = CreateCommentSchema.parse({
            postId: "id-mock-p1",
            content: "Aqui vai o comentário novo a ser publicado!",
            token: "token-mock-luiz"
        })

        const output = await commentBusiness.createComment(input)

        expect(output).toEqual({
            message: "Comentário criado com sucesso"
        })
    })
})