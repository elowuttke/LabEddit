import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { GetCommentsByPostIdSchema } from "../../../src/dtos/comment/getCommentsByPostId.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando GETCOMMENTBYPOSTID", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve disparar erro se token for inválido", async () => {
        expect.assertions(2)
        try {
            const input = GetCommentsByPostIdSchema.parse({
                token: "token-mock-invalido",
                postId: "id-mock-p4"
            })

            const output = await commentBusiness.getCommentsByPostId(input)
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
            const input = GetCommentsByPostIdSchema.parse({
                token: "token-mock-luiz",
                postId: "id-mock-invalido"
            })

            const output = await commentBusiness.getCommentsByPostId(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("Não foi encontrado post com esse id")
            }
        }
    })

    test("Deve retornar toda lista comentário do postId", async () => {
        const input = GetCommentsByPostIdSchema.parse({
            token: "token-mock-luiz",
            postId: "id-mock-p4"
        })

        const output = await commentBusiness.getCommentsByPostId(input)

        expect(output).toHaveLength(2)
        expect(output).toEqual([
            {
                content: "Dissem por aí que Yuzo é o Astrodev, porque os dois nunca foram vistos juntos ao mesmo tempo. Confirma aí Yuzo, você é o Astrodev?",
                createdAt: expect.any(String),
                creator: { id: "id-mock-vini", nickname: "Vini" },
                downvotes: 5,
                id: "id-mock-c4",
                postId: "id-mock-p4",
                updatedAt: expect.any(String),
                upvotes: 10
            }, {
                content: "Amiga, estou aqui!  Amiga, estou aqui!  Se a fase é ruim  E são tantos problemas que não tem fim  Não se esqueça que ouviu de mim  Amiga, estou aqui!  Amiga, estou aqui!",
                createdAt: expect.any(String),
                creator: { id: "id-mock-gabi", nickname: "Gabi" },
                downvotes: 5,
                id: "id-mock-c5",
                postId: "id-mock-p4",
                updatedAt: expect.any(String),
                upvotes: 10
            }
        ])
    })

})