export interface CommentDB {
    id: string,
    creator_id: string,
    post_id: string,
    content: string,
    upvotes: number,
    downvotes: number,
    created_at: string,
    updated_at: string
}

export interface CommentDBWithCreatorNickname {
    id: string,
    creator_id: string,
    post_id: string,
    content: string,
    upvotes: number,
    downvotes: number,
    created_at: string,
    updated_at: string,
    creator_nickname: string
}

export interface CommentModel {
    id: string,
    postId: string,
    content: string,
    upvotes: number,
    downvotes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        nickname: string
    }
}

export interface CommentVoteDB {
    user_id: string,
    comment_id: string,
    vote: boolean
}

export enum COMMENT_VOTE {
    ALREADY_UPVOTE = "ALREADY UPVOTE",
    ALREADY_DOWNVOTE = "ALREADY DOWNVOTE"
}

export class Comment {
    constructor(
        private id: string,
        private postId: string,
        private content: string,
        private upvotes: number,
        private downvotes: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorNickname: string
    ) { }

    public getId(): string {
        return this.id
    }
    public getPostId(): string {
        return this.postId
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
    public setPostId(newPostId: string): void {
        this.postId = newPostId
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

    public toDBModel(): CommentDB {
        return {
            id: this.id,
            post_id: this.postId,
            creator_id: this.creatorId,
            content: this.content,
            upvotes: this.upvotes,
            downvotes: this.downvotes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }

    public toBusinessModel(): CommentModel {
        return {
            id: this.id,
            postId: this.postId,
            content: this.content,
            upvotes: this.upvotes,
            downvotes: this.downvotes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorId,
                nickname: this.creatorNickname
            }
        }
    }
}