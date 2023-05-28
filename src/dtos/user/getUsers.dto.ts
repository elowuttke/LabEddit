import z from "zod"
import { UserModel } from "../../models/User"

export interface GetUsersInputDTO {
    token: string,
    q?: string
}

export type GetUsersOutputDTO = UserModel[]

export const GetUsersSchema = z.object({
    token: z.string().min(1),
    q: z.string().min(1).optional()
}).transform(data => data as GetUsersInputDTO)