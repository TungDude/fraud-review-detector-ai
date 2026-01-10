import { Router } from "express";
import { requireAuth } from "@/middlewares/auth.middleware";
import * as postController from "./post.controller";

const router = Router();

router.get("/", postController.getPosts);
router.get("/merchant", requireAuth, postController.getMerchantPosts);
router.post("/", requireAuth, postController.createPost);

export const postRoutes: Router = router;