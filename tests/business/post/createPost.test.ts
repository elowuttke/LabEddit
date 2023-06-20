import { PostBusiness } from "../../../src/business/PostBusiness"
import { CreatePostSchema } from "../../../src/dtos/post/createPost.dto"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando CREATEPOST", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve disparar erro se token for inválido", async () => {
        expect.assertions(2)
        try {
            const input = CreatePostSchema.parse({
                content: "Aqui vai o conteúdo novo a ser publicado!",
                token: "token-invalido"
            })

            const output = await postBusiness.createPost(input)
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                expect(error.statusCode).toBe(401)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

    test("Deve retornar mensagem", async () => {
        const input = CreatePostSchema.parse({
            content: "Aqui vai o conteúdo novo a ser publicado!",
            token: "token-mock-yuzo"
        })

        const output = await postBusiness.createPost(input)

        expect(output).toEqual({
            message: "Post criado com sucesso"
        })
    })
})