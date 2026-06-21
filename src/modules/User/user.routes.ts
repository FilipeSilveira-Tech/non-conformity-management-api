import { userCreate, getUser } from "./user.controller";
import { Router } from "express";
const router = Router();

router.post("/users", userCreate);
router.get("/users/:username", getUser);

export default router;
