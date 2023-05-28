import { COMMENT_VOTE, CommentDBWithCreatorNickname, CommentVoteDB } from "../models/Comment";
import { CommentDB } from "../models/Comment";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class CommentDatabase extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"
    public static TABLE_COMMENT_VOTE = "comment_vote"

    // Create
    public insertComment = async (
        commentDB: CommentDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .insert(commentDB)
    }

    public insertCommentVote = async (
        commentVoteDB: CommentVoteDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENT_VOTE)
            .insert(commentVoteDB)
    }

    // Read
    public getCommentsWithCreatorNickame = async (
    ): Promise<CommentDBWithCreatorNickname[]> => {
        const commentsWithCreatorNickameDB: CommentDBWithCreatorNickname[] =
            await BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENTS)
                .select(
                    `${CommentDatabase.TABLE_COMMENTS}.id`,
                    `${CommentDatabase.TABLE_COMMENTS}.post_id`,
                    `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                    `${CommentDatabase.TABLE_COMMENTS}.content`,
                    `${CommentDatabase.TABLE_COMMENTS}.upvotes`,
                    `${CommentDatabase.TABLE_COMMENTS}.downvotes`,
                    `${CommentDatabase.TABLE_COMMENTS}.created_at`,
                    `${CommentDatabase.TABLE_COMMENTS}.updated_at`,
                    `${UserDatabase.TABLE_USERS}.nickname as creator_nickame`
                )
                .join(
                    `${UserDatabase.TABLE_USERS}`,
                    `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                    `=`,
                    `${UserDatabase.TABLE_USERS}.id`
                )

        return commentsWithCreatorNickameDB
    }

    public findCommentsWithCreatorNickname = async (
        q: string | undefined
    ): Promise<CommentDBWithCreatorNickname[]> => {
        let commentsDBWithCreatorNickame
        if (q) {
            const result: CommentDBWithCreatorNickname[] = await BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENTS)
                .select(
                    `${CommentDatabase.TABLE_COMMENTS}.id`,
                    `${CommentDatabase.TABLE_COMMENTS}.post_id`,
                    `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                    `${CommentDatabase.TABLE_COMMENTS}.content`,
                    `${CommentDatabase.TABLE_COMMENTS}.upvotes`,
                    `${CommentDatabase.TABLE_COMMENTS}.downvotes`,
                    `${CommentDatabase.TABLE_COMMENTS}.created_at`,
                    `${CommentDatabase.TABLE_COMMENTS}.updated_at`,
                    `${UserDatabase.TABLE_USERS}.nickname as creator_nickame`
                )
                .join(
                    `${UserDatabase.TABLE_USERS}`,
                    `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                    `=`,
                    `${UserDatabase.TABLE_USERS}.id`
                )
                .where("content", "LIKE", `%${q}%`)
            commentsDBWithCreatorNickame = result
        } else {
            const result: CommentDBWithCreatorNickname[] = await BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENTS)
                .select(
                    `${CommentDatabase.TABLE_COMMENTS}.id`,
                    `${CommentDatabase.TABLE_COMMENTS}.post_id`,
                    `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                    `${CommentDatabase.TABLE_COMMENTS}.content`,
                    `${CommentDatabase.TABLE_COMMENTS}.upvotes`,
                    `${CommentDatabase.TABLE_COMMENTS}.downvotes`,
                    `${CommentDatabase.TABLE_COMMENTS}.created_at`,
                    `${CommentDatabase.TABLE_COMMENTS}.updated_at`,
                    `${UserDatabase.TABLE_USERS}.nickname as creator_nickame`
                )
                .join(
                    `${UserDatabase.TABLE_USERS}`,
                    `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                    `=`,
                    `${UserDatabase.TABLE_USERS}.id`
                )
            commentsDBWithCreatorNickame = result
        }
        return commentsDBWithCreatorNickame
    }

    public getCommentWithCreatorNickameById = async (
        id: string
    ): Promise<CommentDBWithCreatorNickname | undefined> => {
        const [result] = await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .select(
                `${CommentDatabase.TABLE_COMMENTS}.id`,
                `${CommentDatabase.TABLE_COMMENTS}.post_id`,
                `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                `${CommentDatabase.TABLE_COMMENTS}.content`,
                `${CommentDatabase.TABLE_COMMENTS}.upvotes`,
                `${CommentDatabase.TABLE_COMMENTS}.downvotes`,
                `${CommentDatabase.TABLE_COMMENTS}.created_at`,
                `${CommentDatabase.TABLE_COMMENTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.nickname as creator_nickame`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                `=`,
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where({ [`${CommentDatabase.TABLE_COMMENTS}.id`]: id })

        return result as CommentDBWithCreatorNickname | undefined
    }

    public getCommentsWithCreatorNickameByCreatorId = async (
        creatorId: string
    ): Promise<CommentDBWithCreatorNickname[] | undefined> => {
        const result = await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .select(
                `${CommentDatabase.TABLE_COMMENTS}.id`,
                `${CommentDatabase.TABLE_COMMENTS}.post_id`,
                `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                `${CommentDatabase.TABLE_COMMENTS}.content`,
                `${CommentDatabase.TABLE_COMMENTS}.upvotes`,
                `${CommentDatabase.TABLE_COMMENTS}.downvotes`,
                `${CommentDatabase.TABLE_COMMENTS}.created_at`,
                `${CommentDatabase.TABLE_COMMENTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.nickname as creator_nickame`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                `=`,
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where({ [`${CommentDatabase.TABLE_COMMENTS}.creator_id`]: creatorId })

        return result as CommentDBWithCreatorNickname[] | undefined
    }

    public getCommentsWithCreatorNickameByPostId = async (
        postId: string
    ): Promise<CommentDBWithCreatorNickname[] | undefined> => {
        const result = await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .select(
                `${CommentDatabase.TABLE_COMMENTS}.id`,
                `${CommentDatabase.TABLE_COMMENTS}.post_id`,
                `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                `${CommentDatabase.TABLE_COMMENTS}.content`,
                `${CommentDatabase.TABLE_COMMENTS}.upvotes`,
                `${CommentDatabase.TABLE_COMMENTS}.downvotes`,
                `${CommentDatabase.TABLE_COMMENTS}.created_at`,
                `${CommentDatabase.TABLE_COMMENTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.nickname as creator_nickame`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                `=`,
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where({ [`${CommentDatabase.TABLE_COMMENTS}.post_id`]: postId })

        return result as CommentDBWithCreatorNickname[] | undefined
    }

    public findCommentVote = async (
        commentVoteDB: CommentVoteDB
    ): Promise<COMMENT_VOTE | undefined> => {

        const [result]: Array<CommentVoteDB | undefined> = await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENT_VOTE)
            .select()
            .where({
                user_id: commentVoteDB.user_id,
                comment_id: commentVoteDB.comment_id
            })

        if (result === undefined) {
            return undefined

        } else if (result.vote) {
            return COMMENT_VOTE.ALREADY_UPVOTE

        } else {
            return COMMENT_VOTE.ALREADY_DOWNVOTE
        }

    }

    public removeCommentVote = async (
        commentVoteDB: CommentVoteDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENT_VOTE)
            .delete()
            .where({
                user_id: commentVoteDB.user_id,
                comment_id: commentVoteDB.comment_id
            })
    }

    // Update
    public updateComment = async (
        commentDB: CommentDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .update(commentDB)
            .where({ id: commentDB.id })
    }

    public updateCommentVote = async (
        commentVoteDB: CommentVoteDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENT_VOTE)
            .update({ vote: commentVoteDB.vote })
            .where({
                user_id: commentVoteDB.user_id,
                comment_id: commentVoteDB.comment_id
            })
    }

    // Delete
    public deleteCommentById = async (
        idToDelete: string
    ): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .delete()
            .where({ id: idToDelete })
    }
}