import { Router } from "express";
import * as postController from "./post.controller";

const router = Router();

router.get("/", postController.getPosts);

export const postRoutes: Router = router;