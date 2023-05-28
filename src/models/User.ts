export enum USER_ROLES {
    ADMIN = "ADMIN",
    USER = "USER"
}

export interface TokenPayload {
    id: string,
    nickname: string,
    role: USER_ROLES
}

export interface UserDB {
    id: string,
    nickname: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface UserModel {
    id: string,
    nickname: string,
    email: string,
    role: USER_ROLES,
    createdAt: string
}

export class User {
    constructor(
        private id: string,
        private nickname: string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
        private createdAt: string
    ) { }

    public getId(): string {
        return this.id
    }
    public getNickame(): string {
        return this.nickname
    }
    public getEmail(): string {
        return this.email
    }
    public getPassword(): string {
        return this.password
    }
    public getRole(): USER_ROLES {
        return this.role
    }
    public getCreatedAt(): string {
        return this.createdAt
    }

    public setId(newId: string): void {
        this.id = newId
    }
    public setNickname(newNickname: string): void {
        this.nickname = newNickname
    }
    public setEmail(newEmail: string): void {
        this.email = newEmail
    }
    public setPassword(newPassword: string): void {
        this.password = newPassword
    }
    public setRole(newRole: USER_ROLES): void {
        this.role = newRole
    }
    public setCreatedAt(newCreatedAt: string): void {
        this.createdAt = newCreatedAt
    }

    public toDBModel(): UserDB {
        return {
            id: this.id,
            nickname: this.nickname,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.createdAt
        }
    }

    public toBusinessModel(): UserModel {
        return {
            id: this.id,
            nickname: this.nickname,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt
        }
    }
}