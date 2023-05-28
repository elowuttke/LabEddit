import z from "zod"
import { PostModel } from "../../models/Post"

export interface GetPostsByCreatorNickameInputDTO {
    token: string,
    nickname: string
}

export type GetPostsByCreatorNickameOutputDTO = PostModel[]

export const GetPostsByCreatorNickameSchema = z.object({
    token: z.string().min(1),
    nickname: z.string().min(1)
}).transform(data => data as GetPostsByCreatorNickameInputDTO)