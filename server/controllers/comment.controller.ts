import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries"

export async function createComment(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: 'Unauthorized' })

        const { productId } = req.params as { productId: string };
        const { content } = req.body;

        if (!content) return res.status(400).json({ error: "Content of comment is required" })

        const product = await queries.getProductById(productId);

        if (!product) return res.status(404).json({ error: "Product not found" });

        const comment = await queries.createComment({
            userId,
            content,
            productId
        })

        res.status(201).json(comment)
    } catch (error) {
        console.error("Error creating comment: ", error);
        res.status(500).json({ error: "Failed to create comment" });
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params as { id: string };
        // check if comment exists and belongs to user
        const existingComment = await queries.getCommentById(id);
        if (!existingComment) return res.status(404).json({ error: "Comment not found" });

        if (existingComment.userId !== userId) {
            return res.status(403).json({ error: "You can only delete your own comments" });
        }

        await queries.deleteComment(id);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
};