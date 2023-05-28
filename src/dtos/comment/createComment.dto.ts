import z from "zod"

export interface CreateCommentInputDTO {
    postId: string,
    content: string,
    token: string
}

export interface CreateCommentOutputDTO {
    message: string
}

export const CreateCommentSchema = z.object({
    postId: z.string().min(1),
    content: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as CreateCommentInputDTO)