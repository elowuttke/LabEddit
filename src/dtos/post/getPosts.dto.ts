import z from "zod"
import { PostModel } from "../../models/Post"

export interface GetPostsInputDTO {
    token: string,
    q?: string
}

export type GetPostsOutputDTO = PostModel[]

export const GetPostsSchema = z.object({
    token: z.string().min(1),
    q: z.string().min(1).optional()
}).transform(data => data as GetPostsInputDTO)