import { CommentDatabase } from "../database/CommentDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { CreateCommentInputDTO, CreateCommentOutputDTO } from "../dtos/comment/createComment.dto";
import { DeleteCommentInputDTO, DeleteCommentOutputDTO } from "../dtos/comment/deleteComment.dto";
import { EditCommentInputDTO, EditCommentOutputDTO } from "../dtos/comment/editComment.dto";
import { GetCommentsByPostIdInputDTO, GetCommentsByPostIdOutputDTO } from "../dtos/comment/getCommentsByPostId.dto";
import { VoteCommentInputDTO, VoteCommentOutputDTO } from "../dtos/comment/voteComment.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { COMMENT_VOTE, Comment, CommentVoteDB } from "../models/Comment";
import { Post } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class CommentBusiness {
    constructor(
        private commentDatabase: CommentDatabase,
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    // Create
    public createComment = async (
        input: CreateCommentInputDTO
    ): Promise<CreateCommentOutputDTO> => {
        const { postId, content, token } = input

        const payload = this.tokenManager.getPayload(token)
        if (!payload) {
            throw new UnauthorizedError()
        }

        const postDB = await this.postDatabase.findPostWithCreatorNicknameById(postId)
        if (!postDB) {
            throw new NotFoundError("Não existe Post com esse 'PostId'")
        }

        const id = this.idGenerator.generate()
        const newComment = new Comment(
            id,
            postId,
            content,
            0,
            0,
            new Date().toLocaleString(),
            new Date().toLocaleString(),
            payload.id,
            payload.nickname
        )

        const newCommentDB = newComment.toDBModel()
        await this.commentDatabase.insertComment(newCommentDB)

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

        post.addComment()
        const updatedPostDB = post.toDBModel()
        await this.postDatabase.updatePost(updatedPostDB)

        const output: CreateCommentOutputDTO = {
            message: "Comentário criado com sucesso"
        }

        return output
    }

    // Read
    public getCommentsByPostId = async (
        input: GetCommentsByPostIdInputDTO
    ): Promise<GetCommentsByPostIdOutputDTO> => {
        const { token, postId } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const commentsDBByPostId = await this.commentDatabase.getCommentsWithCreatorNickameByPostId(postId)

        if (!commentsDBByPostId) {
            throw new BadRequestError("'postId' inválido")
        }

        if (commentsDBByPostId.length < 1) {
            throw new NotFoundError("Não foi encontrado post com esse id")
        }

        const comments = commentsDBByPostId.map((commentDB) => {
            const comment = new Comment(
                commentDB.id,
                commentDB.post_id,
                commentDB.content,
                commentDB.upvotes,
                commentDB.downvotes,
                commentDB.created_at,
                commentDB.updated_at,
                commentDB.creator_id,
                commentDB.creator_nickname
            )
            return comment.toBusinessModel()
        })

        const output: GetCommentsByPostIdOutputDTO = comments

        return output
    }

    // Update
    public editComment = async (
        input: EditCommentInputDTO
    ): Promise<EditCommentOutputDTO> => {
        const { content, token, idToEdit } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const commentDB = await this.commentDatabase.getCommentWithCreatorNickameById(idToEdit)

        if (!commentDB) {
            throw new NotFoundError("Não foi encontrado comentáio com esse id")
        }

        if (payload.id !== commentDB.creator_id) {
            throw new ForbiddenError("Só quem criou o comentário pode editá-lo")
        }

        const comment = new Comment(
            commentDB.id,
            commentDB.post_id,
            commentDB.content,
            commentDB.upvotes,
            commentDB.downvotes,
            commentDB.created_at,
            commentDB.updated_at,
            commentDB.creator_id,
            commentDB.creator_nickname
        )

        comment.setContent(content)
        const updatedDate = new Date().toLocaleString()
        comment.setUpdatedAt(updatedDate)

        const updatedCommentDB = comment.toDBModel()
        await this.commentDatabase.updateComment(updatedCommentDB)

        const output: EditCommentOutputDTO = {
            message: "Comentário editado com sucesso"
        }

        return output
    }

    public voteComment = async (
        input: VoteCommentInputDTO
    ): Promise<VoteCommentOutputDTO> => {

        const { token, commentId, vote } = input // vote ? true = upvote : false = downvote

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const commentDB = await this.commentDatabase.getCommentWithCreatorNickameById(commentId)

        if (!commentDB) {
            throw new NotFoundError("Não foi encontrado comentário com esse id")
        }

        if (commentDB.creator_id === payload.id) {
            throw new UnauthorizedError("Não é permitido votar em seu próprio comentário")
        }

        const comment = new Comment(
            commentDB.id,
            commentDB.post_id,
            commentDB.content,
            commentDB.upvotes,
            commentDB.downvotes,
            commentDB.created_at,
            commentDB.updated_at,
            commentDB.creator_id,
            commentDB.creator_nickname
        )

        const commentVoteDB: CommentVoteDB = {
            user_id: payload.id,
            comment_id: commentId,
            vote
        }

        const commentVoteExists = await this.commentDatabase.findCommentVote(commentVoteDB)

        if (commentVoteExists == COMMENT_VOTE.ALREADY_UPVOTE) {
            if (vote) {
                await this.commentDatabase.removeCommentVote(commentVoteDB)
                comment.removeUpvote()
            } else {
                await this.commentDatabase.updateCommentVote(commentVoteDB)
                comment.removeUpvote()
                comment.addDownvote()
            }
        } else if (commentVoteExists == COMMENT_VOTE.ALREADY_DOWNVOTE) {
            if (vote === false) {
                await this.commentDatabase.removeCommentVote(commentVoteDB)
                comment.removeDownvote()
            } else {
                await this.commentDatabase.updateCommentVote(commentVoteDB)
                comment.removeDownvote()
                comment.addUpvote()
            }
        } else {
            await this.commentDatabase.insertCommentVote(commentVoteDB)
            vote ? comment.addUpvote() : comment.addDownvote()
        }

        const updatedCommentDB = comment.toDBModel()
        await this.commentDatabase.updateComment(updatedCommentDB)

        const output: VoteCommentOutputDTO = {
            message: "Voto registrado com sucesso"
        }

        return output
    }

    // Delete
    public deleteComment = async (
        input: DeleteCommentInputDTO
    ): Promise<DeleteCommentOutputDTO> => {
        const { token, idToDelete } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const commentDB = await this.commentDatabase.getCommentWithCreatorNickameById(idToDelete)

        if (!commentDB) {
            throw new NotFoundError("Não foi encontrado comentário com esse id")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            if (payload.id !== commentDB.creator_id) {
                throw new ForbiddenError("Só quem criou o comentário pode deletá-lo")
            } // e admins, com objetivo de moderação
        }

        const postDB = await this.postDatabase.findPostWithCreatorNicknameById(commentDB.post_id)

        if (!postDB) {
            throw new NotFoundError("Não existe Post com esse 'PostId'")
        }

        await this.commentDatabase.deleteCommentById(idToDelete)

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

        post.removeComment()
        const updatedPostDB = post.toDBModel()
        await this.postDatabase.updatePost(updatedPostDB)

        const output: DeleteCommentOutputDTO = {
            message: "Comentário deletado com sucesso"
        }

        return output
    }
}