import { Router } from "express";
import {
  createSupplier,
  getSupplier,
  getAllSupplier,
} from "./supplier.controller";

const router = Router();

router.post("/suppliers", createSupplier);
router.get("/suppliers/:cnpj", getSupplier);
router.get("/suppliers", getAllSupplier);

export default router;
