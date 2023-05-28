import { POST_VOTE, PostDB, PostDBWithCreatorNickname, PostVoteDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_POST_VOTE = "post_vote"

    // Create
    public insertPost = async (
        postDB: PostDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(postDB)
    }

    public insertPostVote = async (
        postVoteDB: PostVoteDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POST_VOTE)
            .insert(postVoteDB)
    }

    // Read
    public getPostsWithCreatorNickame = async (
    ): Promise<PostDBWithCreatorNickname[]> => {
        const postsWithCreatorNickameDB: PostDBWithCreatorNickname[] =
            await BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .select(
                    `${PostDatabase.TABLE_POSTS}.id`,
                    `${PostDatabase.TABLE_POSTS}.creator_id`,
                    `${PostDatabase.TABLE_POSTS}.content`,
                    `${PostDatabase.TABLE_POSTS}.upvotes`,
                    `${PostDatabase.TABLE_POSTS}.downvotes`,
                    `${PostDatabase.TABLE_POSTS}.comments`,
                    `${PostDatabase.TABLE_POSTS}.created_at`,
                    `${PostDatabase.TABLE_POSTS}.updated_at`,
                    `${UserDatabase.TABLE_USERS}.nickname as creator_nickame`
                )
                .join(
                    `${UserDatabase.TABLE_USERS}`,
                    `${PostDatabase.TABLE_POSTS}.creator_id`,
                    `=`,
                    `${UserDatabase.TABLE_USERS}.id`
                )

        return postsWithCreatorNickameDB
    }

    public findPosts = async (
        q: string | undefined
    ): Promise<PostDB[]> => {
        let postsDB
        if (q) {
            const result: PostDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .where("content", "LIKE", `%${q}%`)
            postsDB = result
        } else {
            const result: PostDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
            postsDB = result
        }
        return postsDB
    }

    public findPostsWithCreatorNickname = async (
        q: string | undefined
    ): Promise<PostDBWithCreatorNickname[]> => {
        let postsDBWithCreatorNickame
        if (q) {
            const result: PostDBWithCreatorNickname[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .select(
                    `${PostDatabase.TABLE_POSTS}.id`,
                    `${PostDatabase.TABLE_POSTS}.creator_id`,
                    `${PostDatabase.TABLE_POSTS}.content`,
                    `${PostDatabase.TABLE_POSTS}.upvotes`,
                    `${PostDatabase.TABLE_POSTS}.downvotes`,
                    `${PostDatabase.TABLE_POSTS}.comments`,
                    `${PostDatabase.TABLE_POSTS}.created_at`,
                    `${PostDatabase.TABLE_POSTS}.updated_at`,
                    `${UserDatabase.TABLE_USERS}.nickname as creator_nickame`
                )
                .join(
                    `${UserDatabase.TABLE_USERS}`,
                    `${PostDatabase.TABLE_POSTS}.creator_id`,
                    `=`,
                    `${UserDatabase.TABLE_USERS}.id`
                )
                .where("content", "LIKE", `%${q}%`)
                .orWhere("creator_nickname", "LIKE", `%${q}%`)
            postsDBWithCreatorNickame = result
        } else {
            const result: PostDBWithCreatorNickname[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .select(
                    `${PostDatabase.TABLE_POSTS}.id`,
                    `${PostDatabase.TABLE_POSTS}.creator_id`,
                    `${PostDatabase.TABLE_POSTS}.content`,
                    `${PostDatabase.TABLE_POSTS}.upvotes`,
                    `${PostDatabase.TABLE_POSTS}.downvotes`,
                    `${PostDatabase.TABLE_POSTS}.comments`,
                    `${PostDatabase.TABLE_POSTS}.created_at`,
                    `${PostDatabase.TABLE_POSTS}.updated_at`,
                    `${UserDatabase.TABLE_USERS}.nickname as creator_nickame`
                )
                .join(
                    `${UserDatabase.TABLE_USERS}`,
                    `${PostDatabase.TABLE_POSTS}.creator_id`,
                    `=`,
                    `${UserDatabase.TABLE_USERS}.id`
                )
            postsDBWithCreatorNickame = result
        }
        return postsDBWithCreatorNickame
    }

    public findPostById = async (
        id: string
    ): Promise<PostDB | undefined> => {
        const [result] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ id })

        return result as PostDB | undefined
    }

    public findPostWithCreatorNicknameById = async (
        id: string
    ): Promise<PostDBWithCreatorNickname | undefined> => {
        const [result] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.upvotes`,
                `${PostDatabase.TABLE_POSTS}.downvotes`,
                `${PostDatabase.TABLE_POSTS}.comments`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.nickname as creator_nickame`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `=`,
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where({ [`${PostDatabase.TABLE_POSTS}.id`]: id })

        return result as PostDBWithCreatorNickname | undefined
    }

    public findPostWithCreatorNicknameByCreatorId = async (
        creatorId: string
    ): Promise<PostDBWithCreatorNickname[] | undefined> => {
        const result = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.upvotes`,
                `${PostDatabase.TABLE_POSTS}.downvotes`,
                `${PostDatabase.TABLE_POSTS}.comments`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.nickname as creator_nickame`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `=`,
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where({ [`${PostDatabase.TABLE_POSTS}.creator_id`]: creatorId })

        return result as PostDBWithCreatorNickname[] | undefined
    }

    public findPostVote = async (
        postVoteDB: PostVoteDB
    ): Promise<POST_VOTE | undefined> => {

        const [result]: Array<PostVoteDB | undefined> = await BaseDatabase
            .connection(PostDatabase.TABLE_POST_VOTE)
            .select()
            .where({
                user_id: postVoteDB.user_id,
                post_id: postVoteDB.post_id
            })

        if (result === undefined) {
            return undefined

        } else if (result.vote) {
            return POST_VOTE.ALREADY_UPVOTE

        } else {
            return POST_VOTE.ALREADY_DOWNVOTE
        }

    }

    public removePostVote = async (
        postVoteDB: PostVoteDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POST_VOTE)
            .delete()
            .where({
                user_id: postVoteDB.user_id,
                post_id: postVoteDB.post_id
            })
    }

    // Update
    public updatePost = async (
        postDB: PostDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(postDB)
            .where({ id: postDB.id })
    }

    public updatePostVote = async (
        postVoteDB: PostVoteDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POST_VOTE)
            .update({ vote: postVoteDB.vote })
            .where({
                user_id: postVoteDB.user_id,
                post_id: postVoteDB.post_id
            })
    }

    // Delete
    public deletePostById = async (
        idToDelete: string
    ): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id: idToDelete })
    }
}