import { Router } from "express";
import { healthRoutes } from "@/modules/health/health.routes";
import { authRoutes } from "@/modules/auth/auth.routes";
import { userRoutes } from "@/modules/user/user.routes";
import { postRoutes } from "@/modules/post/post.routes";
import { commentRoutes } from "@/modules/comment/comment.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

export const v1Router: Router = router;