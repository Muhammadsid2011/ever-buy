import { Router } from "express";
import {
    createComment,
    deleteComment
} from "../controllers/comment.controller"
import { requireAuth } from "@clerk/express";

const router = Router()

router.post("/:productId", requireAuth(), createComment);
router.delete("/:id", requireAuth(), deleteComment)

export default router