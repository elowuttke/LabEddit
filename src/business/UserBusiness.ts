import { UserDatabase } from "../database/UserDatabase";
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/user/getUsers.dto";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { TokenPayload, User, USER_ROLES } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }

    // Create
    public signup = async (
        input: SignupInputDTO
    ): Promise<SignupOutputDTO> => {
        const id = this.idGenerator.generate()
        const { nickname, email, password } = input

        const userNickDB = await this.userDatabase.findUserByNickname(nickname)
        if (userNickDB) {
            throw new ConflictError("Conflito. Esse 'nickname' já existente.")
        }

        const userEmailDB = await this.userDatabase.findUserByEmail(email)
        if (userEmailDB) {
            throw new ConflictError("Conflito. Esse 'email' já existente.")
        }

        const hashedPassword = await this.hashManager.hash(password)

        const newUser = new User(
            id,
            nickname,
            email,
            hashedPassword,
            USER_ROLES.USER, // só é possível criar USER
            new Date().toLocaleString()
        )

        const newUserDB = newUser.toDBModel()
        await this.userDatabase.insertUser(newUserDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            nickname: newUser.getNickame(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(payload)
        const output: SignupOutputDTO = {
            message: "Usuário cadastrado com sucesso",
            token
        }
        return output
    }


    // Read
    public login = async (
        input: LoginInputDTO
    ): Promise<LoginOutputDTO> => {
        const { email, password } = input

        const userDB = await this.userDatabase.findUserByEmail(email)

        if (!userDB) {
            throw new BadRequestError("'email' ou 'password' incorretos")
        } // é NotFoundError 'email' não encontrado", mas por segurança
        // coloca-se o mesmo erro do 'password' incorreto

        const user = new User(
            userDB.id,
            userDB.nickname,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )

        const hashedPassword = user.getPassword()
        const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

        if (!isPasswordCorrect) {
            throw new BadRequestError("'email' ou 'password' incorretos")
        }// é 'passsword' incorreto, mas por segurança coloca-se 'email' ou 'password' incorretos

        const payload: TokenPayload = {
            id: user.getId(),
            nickname: user.getNickame(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)
        const output: LoginOutputDTO = {
            message: "Login realizado com sucesso",
            token
        }

        return output
    }

    public getUsers = async (
        input: GetUsersInputDTO
    ): Promise<GetUsersOutputDTO> => {
        const { token, q } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new ForbiddenError()
        } // somente ADMINs podem acessar este recurso

        const usersDB = await this.userDatabase.findUsers(q)

        const users = usersDB.map((userDB) => {
            const user = new User(
                userDB.id,
                userDB.nickname,
                userDB.email,
                userDB.password,
                userDB.role,
                userDB.created_at
            )

            return user.toBusinessModel()
        })

        const output: GetUsersOutputDTO = users

        return output
    }


    // Update



    // Delete

}