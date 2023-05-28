export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    upvotes: number,
    downvotes: number,
    comments: number,
    created_at: string,
    updated_at: string
}

export interface PostDBWithCreatorNickname {
    id: string,
    creator_id: string,
    content: string,
    upvotes: number,
    downvotes: number,
    comments: number,
    created_at: string,
    updated_at: string,
    creator_nickname: string
}

export interface PostModel {
    id: string,
    content: string,
    upvotes: number,
    downvotes: number,
    comments: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        nickname: string
    }
}

export interface PostVoteDB {
    user_id: string,
    post_id: string,
    vote: boolean
}

export enum POST_VOTE {
    ALREADY_UPVOTE = "ALREADY UPVOTE",
    ALREADY_DOWNVOTE = "ALREADY DOWNVOTE"
}

export class Post {
    constructor(
        private id: string,
        private content: string,
        private upvotes: number,
        private downvotes: number,
        private comments: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorNickname: string
    ) { }

    public getId(): string {
        return this.id
    }
    public getContent(): string {
        return this.content
    }
    public getUpvotes(): number {
        return this.upvotes
    }
    public getDownvotes(): number {
        return this.downvotes
    }
    public getComments(): number {
        return this.comments
    }
    public getCreatedAt(): string {
        return this.createdAt
    }
    public getUpdatedAt(): string {
        return this.updatedAt
    }
    public getCreatorId(): string {
        return this.creatorId
    }
    public getCreatorNickname(): string {
        return this.creatorNickname
    }

    public setId(newId: string): void {
        this.id = newId
    }
    public setContent(newContent: string): void {
        this.content = newContent
    }
    public setUpvotes(newUpvotes: number): void {
        this.upvotes = newUpvotes
    }
    public setDownvotes(newDownvotes: number): void {
        this.downvotes = newDownvotes
    }
    public setComments(newComments: number): void {
        this.comments = newComments
    }
    public setCreatedAt(newCreatedAt: string): void {
        this.createdAt = newCreatedAt
    }
    public setUpdatedAt(newUpdatedAt: string): void {
        this.updatedAt = newUpdatedAt
    }
    public setCreatorId(newCreatorId: string): void {
        this.creatorId = newCreatorId
    }
    public setCreatorNickname(newCreatorNickname: string): void {
        this.creatorNickname = newCreatorNickname
    }

    public addUpvote = (): void => {
        this.upvotes++
    }
    public removeUpvote = (): void => {
        this.upvotes--
    }

    public addDownvote = (): void => {
        this.downvotes++
    }
    public removeDownvote = (): void => {
        this.downvotes--
    }

    public addComment = (): void => {
        this.comments++
    }
    public removeComment = (): void => {
        this.comments--
    }

    public toDBModel(): PostDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            upvotes: this.upvotes,
            downvotes: this.downvotes,
            comments: this.comments,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }

    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            content: this.content,
            upvotes: this.upvotes,
            downvotes: this.downvotes,
            comments: this.comments,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorId,
                nickname: this.creatorNickname
            }
        }
    }
}