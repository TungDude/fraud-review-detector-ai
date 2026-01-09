import { Router } from "express";
import { requireAuth } from "@/middlewares/auth.middleware";
import * as commentController from "./comment.controller";

const router = Router();

router.get("/", commentController.getComments);
router.post("/", requireAuth, commentController.createComment);

export const commentRoutes: Router = router;