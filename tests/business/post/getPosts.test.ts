import { PostBusiness } from "../../../src/business/PostBusiness"
import { GetPostsSchema } from "../../../src/dtos/post/getPosts.dto"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando GETPOSTS", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve disparar erro se token for inválido", async () => {
        expect.assertions(2)
        try {
            const input = GetPostsSchema.parse({
                token: "token-mock-invalido"
            })

            const output = await postBusiness.getPosts(input)
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                expect(error.statusCode).toBe(401)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

    test("Deve retornar toda lista posts", async () => {
        const input = GetPostsSchema.parse({
            token: "token-mock-gabi",
        })

        const output = await postBusiness.getPosts(input)

        expect(output).toHaveLength(4)
        expect(output).toEqual([
            {
                id: 'id-mock-p1',
                content: '!!!CONFIEM NO PPROCESSO!!!',
                upvotes: 10,
                downvotes: 5,
                comments: 3,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                creator: { id: 'id-mock-gabi', nickname: 'Gabi' }
            },
            {
                id: 'id-mock-p2',
                content: 'O teu SIM vai chegar!',
                upvotes: 10,
                downvotes: 5,
                comments: 3,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                creator: { id: 'id-mock-jessica', nickname: 'Jessica' }
            },
            {
                id: 'id-mock-p3',
                content: 'Agora eu quero ver os bugs, vamos debugar!',
                upvotes: 10,
                downvotes: 5,
                comments: 3,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                creator: { id: 'id-mock-clara', nickname: 'Clara' }
            },
            {
                id: 'id-mock-p4',
                content: 'Vamos pegar, por exemplo, um usuário chamado Astrodev.',
                upvotes: 10,
                downvotes: 5,
                comments: 3,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                creator: { id: 'id-mock-yuzo', nickname: 'Yuzo' }
            }
        ])
    })


})