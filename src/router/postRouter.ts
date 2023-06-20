import express from "express"
import { PostController } from "../controller/PostController"
import { PostBusiness } from "../business/PostBusiness"
import { PostDatabase } from "../database/PostDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

// Create
postRouter.post("/", postController.createPost)

// Read
postRouter.get("/", postController.getPosts)    

// Update
postRouter.put("/:id", postController.editPost)
postRouter.put("/:id/vote", postController.votePost)

// Delete
postRouter.delete("/:id", postController.deletePost)