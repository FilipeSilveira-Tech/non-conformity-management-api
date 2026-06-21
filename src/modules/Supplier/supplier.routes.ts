import { Router } from "express";
import { createSupplie } from "./supplier.controller";

const router = Router();

router.post("/suppliers", createSupplie);

export default router;
