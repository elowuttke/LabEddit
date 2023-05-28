import express from "express"
import { CommentController } from "../controller/CommentController"
import { CommentBusiness } from "../business/CommentBusiness"
import { CommentDatabase } from "../database/CommentDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostDatabase } from "../database/PostDatabase"

export const commentRouter = express.Router()

const commentController = new CommentController(
    new CommentBusiness(
        new CommentDatabase(),
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

// Create
commentRouter.post("/", commentController.createComment)

// Read
commentRouter.get("/", commentController.getCommentsByPostId)

// Update
commentRouter.put("/:id", commentController.editComment)
commentRouter.put("/:id/vote", commentController.voteComment)

// Delete
commentRouter.delete("/:id", commentController.deleteComment)