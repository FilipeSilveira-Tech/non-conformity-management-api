import { Router } from "express";
import { createSupplier, getSupplier } from "./supplier.controller";

const router = Router();

router.post("/suppliers", createSupplier);
router.get("/suppliers/:cnpj", getSupplier);

export default router;
