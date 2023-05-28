import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    // Create
    public insertUser = async (
        userDB: UserDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }


    // Read
    public findUsers = async (
        q: string | undefined
    ): Promise<UserDB[]> => {
        let usersDB

        if (q) {
            const result: UserDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where("nickname", "LIKE", `%${q}%`)
                .orWhere("email", "LIKE", `%${q}%`)
            usersDB = result
        } else {
            const result: UserDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
            usersDB = result
        }
        return usersDB
    }

    public findUserByNickname = async (
        nickname: string
    ): Promise<UserDB | undefined> => {
        const [userDB] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ nickname })

        return userDB as UserDB | undefined
    }

    public findUserByEmail = async (
        email: string
    ): Promise<UserDB | undefined> => {
        const [userDB] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ email })

        return userDB as UserDB | undefined
    }


    // Update


    // Delete
    public deleteUserById = async (
        idToDelete: string
    ): Promise<void> => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .delete()
            .where({ id: idToDelete })
    }

}