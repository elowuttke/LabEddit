import { COMMENT_VOTE, CommentDBWithCreatorNickname, CommentVoteDB, CommentDB } from "../../src/models/Comment";
import { BaseDatabase } from "../../src/database/BaseDatabase";

const commentsMock: CommentDB[] = [
    {
        id: "id-mock-c1",
        creator_id: "id-mock-luiz",
        post_id: "id-mock-p1",
        content: "O processo do aprendizado é como montar um quebra-cabeça, dá um nervoso de ver ele incompleto, ansiedade enquanto aida não está pronto, e uma alegria imensa quando tudo se encaixa e você pode olhar para o todo, sabendo do esforço que foi necessário em cada peça.",
        upvotes: 10,
        downvotes: 5,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString()
    }, {
        id: "id-mock-c2",
        creator_id: "id-mock-yuzo",
        post_id: "id-mock-p3",
        content: "Eu devoro bugs no café da manhã!",
        upvotes: 10,
        downvotes: 5,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString()
    }, {
        id: "id-mock-c3",
        creator_id: "id-mock-lau",
        post_id: "id-mock-p2",
        content: "Difícil não se decepcionar com os nãos assim que eles chegam. Porém é lindo rever daqui a 5 ou 10 anos toda a jornada e perceber quanto crescimento houve, quanta evolução pessoal e profissional, especialmente nesses momentos do não, enquanto aguardava o sim.",
        upvotes: 10,
        downvotes: 5,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString()
    }, {
        id: "id-mock-c4",
        creator_id: "id-mock-vini",
        post_id: "id-mock-p4",
        content: "Dissem por aí que Yuzo é o Astrodev, porque os dois nunca foram vistos juntos ao mesmo tempo. Confirma aí Yuzo, você é o Astrodev?",
        upvotes: 10,
        downvotes: 5,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString()
    }, {
        id: "id-mock-c5",
        creator_id: "id-mock-gabi",
        post_id: "id-mock-p4",
        content: "Amiga, estou aqui!  Amiga, estou aqui!  Se a fase é ruim  E são tantos problemas que não tem fim  Não se esqueça que ouviu de mim  Amiga, estou aqui!  Amiga, estou aqui!",
        upvotes: 10,
        downvotes: 5,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString()
    }
]

const commentsWithCreatorNicknameMock: CommentDBWithCreatorNickname[] = [
    {
        id: "id-mock-c1",
        creator_id: "id-mock-luiz",
        post_id: "id-mock-p1",
        content: "O processo do aprendizado é como montar um quebra-cabeça, dá um nervoso de ver ele incompleto, ansiedade enquanto aida não está pronto, e uma alegria imensa quando tudo se encaixa e você pode olhar para o todo, sabendo do esforço que foi necessário em cada peça.",
        upvotes: 10,
        downvotes: 5,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
        creator_nickname: "Luiz"
    }, {
        id: "id-mock-c2",
        creator_id: "id-mock-yuzo",
        post_id: "id-mock-p3",
        content: "Eu devoro bugs no café da manhã!",
        upvotes: 10,
        downvotes: 5,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
        creator_nickname: "Yuzo"
    }, {
        id: "id-mock-c3",
        creator_id: "id-mock-lau",
        post_id: "id-mock-p2",
        content: "Difícil não se decepcionar com os nãos assim que eles chegam. Porém é lindo rever daqui a 5 ou 10 anos toda a jornada e perceber quanto crescimento houve, quanta evolução pessoal e profissional, especialmente nesses momentos do não, enquanto aguardava o sim.",
        upvotes: 10,
        downvotes: 5,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
        creator_nickname: "Lau"
    }, {
        id: "id-mock-c4",
        creator_id: "id-mock-vini",
        post_id: "id-mock-p4",
        content: "Dissem por aí que Yuzo é o Astrodev, porque os dois nunca foram vistos juntos ao mesmo tempo. Confirma aí Yuzo, você é o Astrodev?",
        upvotes: 10,
        downvotes: 5,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
        creator_nickname: "Vini"
    }, {
        id: "id-mock-c5",
        creator_id: "id-mock-gabi",
        post_id: "id-mock-p4",
        content: "Amiga, estou aqui!  Amiga, estou aqui!  Se a fase é ruim  E são tantos problemas que não tem fim  Não se esqueça que ouviu de mim  Amiga, estou aqui!  Amiga, estou aqui!",
        upvotes: 10,
        downvotes: 5,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
        creator_nickname: "Gabi"
    }
]

const commentVoteMock: CommentVoteDB[] = [
    {
        user_id: "id-mock-lau",
        comment_id: "id-mock-c1",
        vote: true
    }, {
        user_id: "id-mock-yuzo",
        comment_id: "id-mock-c3",
        vote: true
    }, {
        user_id: "id-mock-jessica",
        comment_id: "id-mock-c2",
        vote: false
    }, {
        user_id: "id-mock-luiz",
        comment_id: "id-mock-c5",
        vote: false
    }, {
        user_id: "id-mock-gabi",
        comment_id: "id-mock-c3",
        vote: true
    }, {
        user_id: "id-mock-clara",
        comment_id: "id-mock-c4",
        vote: false
    }   // 0 = false = downvote
]       // 1 = true = upvote

export class CommentDatabaseMock extends BaseDatabase {

    // Create
    public insertComment = async (
        commentDB: CommentDB
    ): Promise<void> => {

    }

    public insertCommentVote = async (
        commentVoteDB: CommentVoteDB
    ): Promise<void> => {

    }

    // Read
    public getCommentsWithCreatorNickame = async (
    ): Promise<CommentDBWithCreatorNickname[]> => {
        return commentsWithCreatorNicknameMock
    }

    public findCommentsWithCreatorNickname = async (
        q: string | undefined
    ): Promise<CommentDBWithCreatorNickname[]> => {
        if (q) {
            return commentsWithCreatorNicknameMock.filter((comment) => {
                comment.content.toLocaleLowerCase()
                    .includes(q.toLocaleLowerCase())
            })
        } else {
            return commentsWithCreatorNicknameMock
        }
    }

    public getCommentWithCreatorNickameById = async (
        id: string
    ): Promise<CommentDBWithCreatorNickname | undefined> => {
        return commentsWithCreatorNicknameMock.filter(comment => comment.id === id)[0]
    }

    public getCommentsWithCreatorNickameByCreatorId = async (
        creatorId: string
    ): Promise<CommentDBWithCreatorNickname[] | undefined> => {
        return commentsWithCreatorNicknameMock.filter(comment => comment.creator_id === creatorId)
    }

    public getCommentsWithCreatorNickameByPostId = async (
        postId: string
    ): Promise<CommentDBWithCreatorNickname[] | undefined> => {
        return commentsWithCreatorNicknameMock.filter(comment => comment.post_id === postId)
    }

    public findCommentVote = async (
        commentVoteDB: CommentVoteDB
    ): Promise<COMMENT_VOTE | undefined> => {
        const [result] = commentVoteMock.filter(commentVote => commentVote.comment_id === commentVoteDB.comment_id && commentVote.user_id === commentVoteDB.user_id)

        if (result === undefined) {
            return undefined

        } else if (result.vote) {
            return COMMENT_VOTE.ALREADY_UPVOTE

        } else {
            return COMMENT_VOTE.ALREADY_DOWNVOTE
        }

    }

    public removeCommentVote = async (
        commentVoteDB: CommentVoteDB
    ): Promise<void> => {

    }

    // Update
    public updateComment = async (
        commentDB: CommentDB
    ): Promise<void> => {

    }

    public updateCommentVote = async (
        commentVoteDB: CommentVoteDB
    ): Promise<void> => {

    }

    // Delete
    public deleteCommentById = async (
        idToDelete: string
    ): Promise<void> => {

    }
}