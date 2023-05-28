import { USER_ROLES, UserDB } from "../../src/models/User"
import { BaseDatabase } from "../../src/database/BaseDatabase";

const usersMock: UserDB[] = [
    {
        id: "id-mock-lau",
        nickname: "Lau",
        email: "lau@dominio.com",
        password: "lau123",
        role: USER_ROLES.ADMIN,
        created_at: new Date().toLocaleString()
    },
    {
        id: "id-mock-yuzo",
        nickname: "Yuzo",
        email: "yuzo@dominio.com",
        password: "yuzo123",
        role: USER_ROLES.USER,
        created_at: new Date().toLocaleString()
    },
    {
        id: "id-mock-vini",
        nickname: "Vini",
        email: "vini@dominio.com",
        password: "vini123",
        role: USER_ROLES.USER,
        created_at: new Date().toLocaleString()
    },
    {
        id: "id-mock-gabi",
        nickname: "Gabi",
        email: "gabi@dominio.com",
        password: "gabi123",
        role: USER_ROLES.USER,
        created_at: new Date().toLocaleString()
    },
    {
        id: "id-mock-clara",
        nickname: "Clara",
        email: "clara@dominio.com",
        password: "clara123",
        role: USER_ROLES.USER,
        created_at: new Date().toLocaleString()
    },
    {
        id: "id-mock-luiz",
        nickname: "Luiz",
        email: "luiz@dominio.com",
        password: "luiz123",
        role: USER_ROLES.USER,
        created_at: new Date().toLocaleString()
    },
    {
        id: "id-mock-jessica",
        nickname: "Jessica",
        email: "jessica@dominio.com",
        password: "jessica123",
        role: USER_ROLES.USER,
        created_at: new Date().toLocaleString()
    },
]

export class UserDatabaseMock extends BaseDatabase {
    //public static TABLE_USERS = "users"

    // Create
    public insertUser = async (
        userDB: UserDB
    ): Promise<void> => {

    }


    // Read
    public findUsers = async (
        q: string | undefined
    ): Promise<UserDB[]> => {
        if (q) {
            const result = usersMock.filter(user =>
                user.nickname.toLocaleLowerCase()
                    .includes(q.toLocaleLowerCase()) ||
                user.email.toLocaleLowerCase()
                    .includes(q.toLocaleLowerCase()))
            return result
        } else {
            return usersMock
        }
    }

    public findUserByNickname = async (
        nickname: string
    ): Promise<UserDB | undefined> => {
        return usersMock.filter(user => user.nickname === nickname)[0]
    }

    public findUserByEmail = async (
        email: string
    ): Promise<UserDB | undefined> => {
        return usersMock.filter(user => user.email === email)[0]
    }


    // Update


    // Delete
    public deleteUserById = async (
        idToDelete: string
    ): Promise<void> => {

    }

}