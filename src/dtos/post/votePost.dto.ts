import z from "zod"

export interface VotePostInputDTO {
    postId: string,
    token: string,
    vote: boolean // true = upvote, false = downvote
}

export interface VotePostOutputDTO {
    message: string
}

export const VotePostSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1),
    vote: z.boolean()
}).transform(data => data as VotePostInputDTO)