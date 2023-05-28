import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/post/deletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/post/getPosts.dto";
import { VotePostInputDTO, VotePostOutputDTO } from "../dtos/post/votePost.dto";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { POST_VOTE, Post, PostVoteDB } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    // Create
    public createPost = async (
        input: CreatePostInputDTO
    ): Promise<CreatePostOutputDTO> => {
        const { content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const id = this.idGenerator.generate()
        const newPost = new Post(
            id,
            content,
            0,
            0,
            0,
            new Date().toLocaleString(),
            new Date().toLocaleString(),
            payload.id,
            payload.nickname
        )

        const newPostDB = newPost.toDBModel()
        await this.postDatabase.insertPost(newPostDB)

        const output: CreatePostOutputDTO = {
            message: "Post criado com sucesso"
        }

        return output
    }

    // Read
    public getPosts = async (
        input: GetPostsInputDTO
    ): Promise<GetPostsOutputDTO> => {
        const { token, q } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postsWithCreatorNickameDB = await this.postDatabase.findPostsWithCreatorNickname(q)

        const posts = postsWithCreatorNickameDB.map((postWithCreatorName) => {
            const post = new Post(
                postWithCreatorName.id,
                postWithCreatorName.content,
                postWithCreatorName.upvotes,
                postWithCreatorName.downvotes,
                postWithCreatorName.comments,
                postWithCreatorName.created_at,
                postWithCreatorName.updated_at,
                postWithCreatorName.creator_id,
                postWithCreatorName.creator_nickname
            )
            return post.toBusinessModel()
        })

        const output: GetPostsOutputDTO = posts

        return output
    }

    // Update
    public editPost = async (
        input: EditPostInputDTO
    ): Promise<EditPostOutputDTO> => {
        const { content, token, idToEdit } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postDB = await this.postDatabase.findPostWithCreatorNicknameById(idToEdit)

        if (!postDB) {
            throw new NotFoundError("Não foi encontrado post com esse id")
        }

        if (payload.id !== postDB.creator_id) {
            throw new ForbiddenError("Só quem criou o post pode editá-lo")
        }

        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.upvotes,
            postDB.downvotes,
            postDB.comments,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            postDB.creator_nickname
        )

        post.setContent(content)
        const updatedDate = new Date().toLocaleString()
        post.setUpdatedAt(updatedDate)

        const updatedPostDB = post.toDBModel()
        await this.postDatabase.updatePost(updatedPostDB)

        const output: EditPostOutputDTO = {
            message: "Post editado com sucesso"
        }

        return output
    }

    public votePost = async (
        input: VotePostInputDTO
    ): Promise<VotePostOutputDTO> => {

        const { token, postId, vote } = input // vote ? true = upvote : false = downvote

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postDB = await this.postDatabase.findPostWithCreatorNicknameById(postId)

        if (!postDB) {
            throw new NotFoundError("Não foi encontrado post com esse id")
        }

        if (postDB.creator_id === payload.id) {
            throw new UnauthorizedError("Não é permitido votar em seu próprio post")
        }

        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.upvotes,
            postDB.downvotes,
            postDB.comments,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            postDB.creator_nickname
        )

        const postVoteDB: PostVoteDB = {
            user_id: payload.id,
            post_id: postId,
            vote
        }

        const postVoteExists = await this.postDatabase.findPostVote(postVoteDB)

        if (postVoteExists == POST_VOTE.ALREADY_UPVOTE) {
            if (vote) {
                await this.postDatabase.removePostVote(postVoteDB)
                post.removeUpvote()
            } else {
                await this.postDatabase.updatePostVote(postVoteDB)
                post.removeUpvote()
                post.addDownvote()
            }
        } else if (postVoteExists == POST_VOTE.ALREADY_DOWNVOTE) {
            if (vote === false) {
                await this.postDatabase.removePostVote(postVoteDB)
                post.removeDownvote()
            } else {
                await this.postDatabase.updatePostVote(postVoteDB)
                post.removeDownvote()
                post.addUpvote()
            }
        } else {
            await this.postDatabase.insertPostVote(postVoteDB)
            vote ? post.addUpvote() : post.addDownvote()
        }

        const updatedPostDB = post.toDBModel()
        await this.postDatabase.updatePost(updatedPostDB)

        const output: VotePostOutputDTO = {
            message: "Voto registrado com sucesso"
        }

        return output
    }

    // Delete
    public deletePost = async (
        input: DeletePostInputDTO
    ): Promise<DeletePostOutputDTO> => {
        const { token, idToDelete } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postDB = await this.postDatabase.findPostById(idToDelete)

        if (!postDB) {
            throw new NotFoundError("post com esse id não existe")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            if (payload.id !== postDB.creator_id) {
                throw new ForbiddenError("Só quem criou o post pode deletá-lo")
            } // e admins, com objetivo de moderação
        }

        await this.postDatabase.deletePostById(idToDelete)

        const output: DeletePostOutputDTO = {
            message: "Post deletado com sucesso"
        }

        return output
    }
}