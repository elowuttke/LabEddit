import { Request, Response } from "express";
import { CommentBusiness } from "../business/CommentBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { CreateCommentSchema } from "../dtos/comment/createComment.dto";
import { GetCommentsByPostIdSchema } from "../dtos/comment/getCommentsByPostId.dto";
import { EditCommentSchema } from "../dtos/comment/editComment.dto";
import { DeleteCommentSchema } from "../dtos/comment/deleteComment.dto";
import { VoteCommentSchema } from "../dtos/comment/voteComment.dto";

export class CommentController {
    constructor(
        private commentBusiness: CommentBusiness
    ) { }

    // Create
    public createComment = async (req: Request, res: Response) => {
        try {
            const input = CreateCommentSchema.parse({
                postId: req.body.postId,
                content: req.body.content,
                token: req.headers.authorization
            })

            const output = await this.commentBusiness.createComment(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    // Read
    public getCommentsByPostId = async (req: Request, res: Response) => {
        try {
            const input = GetCommentsByPostIdSchema.parse({
                token: req.headers.authorization,
                postId: req.body.postId
            })

            const output = await this.commentBusiness.getCommentsByPostId(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    // Update
    public editComment = async (req: Request, res: Response) => {
        try {
            const input = EditCommentSchema.parse({
                content: req.body.content,
                token: req.headers.authorization,
                idToEdit: req.params.id
            })

            const output = await this.commentBusiness.editComment(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public voteComment = async (req: Request, res: Response) => {
        try {
            const input = VoteCommentSchema.parse({
                token: req.headers.authorization,
                commentId: req.params.id,
                vote: req.body.vote // true = upvote, false = downvote
            })

            const output = await this.commentBusiness.voteComment(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    // Delete
    public deleteComment = async (req: Request, res: Response) => {
        try {
            const input = DeleteCommentSchema.parse({
                token: req.headers.authorization,
                idToDelete: req.params.id
            })

            const output = await this.commentBusiness.deleteComment(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

}
