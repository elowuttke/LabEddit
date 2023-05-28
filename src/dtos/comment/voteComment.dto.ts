import z from "zod"

export interface VoteCommentInputDTO {
    commentId: string,
    token: string,
    vote: boolean // true = upvote, false = downvote
}

export interface VoteCommentOutputDTO {
    message: string
}

export const VoteCommentSchema = z.object({
    commentId: z.string().min(1),
    token: z.string().min(1),
    vote: z.boolean()
}).transform(data => data as VoteCommentInputDTO)