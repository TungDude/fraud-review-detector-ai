import { Router } from "express";
import { healthRoutes } from "@/modules/health/health.routes";

const router = Router();

router.use("/health", healthRoutes);

export const v1Router: Router = router;