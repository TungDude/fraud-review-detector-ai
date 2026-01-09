import { Router } from "express";
import * as authController from "./auth.controller";

const router = Router();

router.post("/signin", authController.signin);
router.post("/signout", authController.signout);

export const authRoutes: Router = router;