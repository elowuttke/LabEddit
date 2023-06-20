import { TokenPayload, USER_ROLES } from "../../src/models/User"

export class TokenManagerMock {
    public createToken = (payload: TokenPayload): string => {
        if (payload.id === "id-mock") {
            return "token-mock"

        } else if (payload.id === "id-mock-lau") {
            // login de lau (conta ADMIN)
            return "token-mock-lau"

        } else if (payload.id === "id-mock-yuzo") {
            // login de yuzo (conta USER)
            return "token-mock-yuzo"

        } else if (payload.id === "id-mock-vini") {
            // login de vini (conta USER)
            return "token-mock-vini"

        } else if (payload.id === "id-mock-gabi") {
            // login de gabi (conta USER)
            return "token-mock-gabi"

        } else if (payload.id === "id-mock-clara") {
            // login de clara (conta USER)
            return "token-mock-clara"

        } else if (payload.id === "id-mock-luiz") {
            // login de luiz (conta USER)
            return "token-mock-luiz"

        } else {
            // login de jessica (conta USER)
            return "token-mock-jessica"
        }
    }

    public getPayload = (token: string): TokenPayload | null => {
        if (token === "token-mock-lau") {
            return {
                id: "id-mock-lau",
                nickname: "Lau",
                role: USER_ROLES.ADMIN
            }
        } else if (token === "token-mock-yuzo") {
            return {
                id: "id-mock-yuzo",
                nickname: "Yuzo",
                role: USER_ROLES.USER
            }
        } else if (token === "token-mock-vini") {
            return {
                id: "id-mock-vini",
                nickname: "Vini",
                role: USER_ROLES.USER
            }
        } else if (token === "token-mock-gabi") {
            return {
                id: "id-mock-gabi",
                nickname: "Gabi",
                role: USER_ROLES.USER
            }
        } else if (token === "token-mock-clara") {
            return {
                id: "id-mock-clara",
                nickname: "Clara",
                role: USER_ROLES.USER
            }
        } else if (token === "token-mock-luiz") {
            return {
                id: "id-mock-luiz",
                nickname: "Luiz",
                role: USER_ROLES.USER
            }
        } else if (token === "token-mock-jessica") {
            return {
                id: "id-mock-jessica",
                nickname: "Jessica",
                role: USER_ROLES.USER
            }
        } else {
            return null
        }
    }
}