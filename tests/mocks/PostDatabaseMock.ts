import { POST_VOTE, PostDB, PostDBWithCreatorNickname, PostVoteDB } from "../../src/models/Post"
import { BaseDatabase } from "../../src/database/BaseDatabase"

const postsMock: PostDB[] = [
    {
        id: "id-mock-p1",
        creator_id: "id-mock-gabi",
        content: "!!!CONFIEM NO PPROCESSO!!!",
        upvotes: 10,
        downvotes: 5,
        comments: 3,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString()
    }, {
        id: "id-mock-p2",
        creator_id: "id-mock-jessica",
        content: "O teu SIM vai chegar!",
        upvotes: 10,
        downvotes: 5,
        comments: 3,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString()
    }, {
        id: "id-mock-p3",
        creator_id: "id-mock-clara",
        content: "Agora eu quero ver os bugs, vamos debugar!",
        upvotes: 10,
        downvotes: 5,
        comments: 3,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString()
    }, {
        id: "id-mock-p4",
        creator_id: "id-mock-yuzo",
        content: "Vamos pegar, por exemplo, um usuário chamado Astrodev.",
        upvotes: 10,
        downvotes: 5,
        comments: 3,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString()
    }
]

const postsWithCreatorNickameMock: PostDBWithCreatorNickname[] = [
    {
        id: "id-mock-p1",
        creator_id: "id-mock-gabi",
        content: "!!!CONFIEM NO PPROCESSO!!!",
        upvotes: 10,
        downvotes: 5,
        comments: 3,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
        creator_nickname: "Gabi"
    }, {
        id: "id-mock-p2",
        creator_id: "id-mock-jessica",
        content: "O teu SIM vai chegar!",
        upvotes: 10,
        downvotes: 5,
        comments: 3,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
        creator_nickname: "Jessica"
    }, {
        id: "id-mock-p3",
        creator_id: "id-mock-clara",
        content: "Agora eu quero ver os bugs, vamos debugar!",
        upvotes: 10,
        downvotes: 5,
        comments: 3,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
        creator_nickname: "Clara"
    }, {
        id: "id-mock-p4",
        creator_id: "id-mock-yuzo",
        content: "Vamos pegar, por exemplo, um usuário chamado Astrodev.",
        upvotes: 10,
        downvotes: 5,
        comments: 3,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
        creator_nickname: "Yuzo"
    }
]

const postVoteMock: PostVoteDB[] = [
    {
        user_id: "u007",
        post_id: "p001",
        vote: true
    }, {
        user_id: "u001",
        post_id: "p002",
        vote: true
    }, {
        user_id: "u006",
        post_id: "p003",
        vote: false
    }, {
        user_id: "u003",
        post_id: "p004",
        vote: false
    }, {
        user_id: "u002",
        post_id: "p001",
        vote: true
    }, {
        user_id: "u004",
        post_id: "p003",
        vote: false
    }   // 0 = false = downvote
]       // 1 = true = upvote

export class PostDatabaseMock extends BaseDatabase {

    // Create
    public insertPost = async (
        postDB: PostDB
    ): Promise<void> => {

    }

    public insertPostVote = async (
        postVoteDB: PostVoteDB
    ): Promise<void> => {

    }

    // Read
    public getPostsWithCreatorNickame = async (
    ): Promise<PostDBWithCreatorNickname[]> => {
        return postsWithCreatorNickameMock
    }

    public findPosts = async (
        q: string | undefined
    ): Promise<PostDB[]> => {
        if (q) {
            return postsMock.filter(post =>
                post.content.toLocaleLowerCase()
                    .includes(q.toLocaleLowerCase()))
        } else {
            return postsMock
        }
    }

    public findPostsWithCreatorNickname = async (
        q: string | undefined
    ): Promise<PostDBWithCreatorNickname[]> => {
        if (q) {
            const result = postsWithCreatorNickameMock.filter((post) => {
                post.content.toLocaleLowerCase()
                    .includes(q.toLocaleLowerCase()) ||
                    post.creator_nickname.toLocaleLowerCase()
                        .includes(q.toLocaleLowerCase())
            })
            return result
        } else {
            return postsWithCreatorNickameMock
        }
    }

    public findPostById = async (
        id: string
    ): Promise<PostDB | undefined> => {
        return postsMock.filter(post => post.id === id)[0]
    }

    public findPostWithCreatorNicknameById = async (
        id: string
    ): Promise<PostDBWithCreatorNickname | undefined> => {
        return postsWithCreatorNickameMock.filter(post => post.id === id)[0]
    }

    public findPostWithCreatorNicknameByCreatorId = async (
        creatorId: string
    ): Promise<PostDBWithCreatorNickname[] | undefined> => {
        return postsWithCreatorNickameMock.filter(post => post.creator_id === creatorId)
    }

    public findPostVote = async (
        postVoteDB: PostVoteDB
    ): Promise<POST_VOTE | undefined> => {
        const [result] = postVoteMock.filter(postVote => postVote.post_id === postVoteDB.post_id && postVote.user_id === postVoteDB.post_id)

        if (result === undefined) {
            return undefined

        } else if (result.vote) {
            return POST_VOTE.ALREADY_UPVOTE

        } else {
            return POST_VOTE.ALREADY_DOWNVOTE
        }

    }

    public removePostVote = async (
        postVoteDB: PostVoteDB
    ): Promise<void> => {
    }

    // Update
    public updatePost = async (
        postDB: PostDB
    ): Promise<void> => {

    }

    public updatePostVote = async (
        postVoteDB: PostVoteDB
    ): Promise<void> => {

    }

    // Delete
    public deletePostById = async (
        idToDelete: string
    ): Promise<void> => {

    }
}