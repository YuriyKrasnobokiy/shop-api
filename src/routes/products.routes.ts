import { Router } from "express";
import { getProductById, getProductsList } from "../controllers/products.controller.js";
import { getAllProductCategories } from "../controllers/categories.controller.js";

const router = Router();

router.get("/", getProductsList);

router.get("/categories", getAllProductCategories);

router.get("/:id", getProductById);

export default router;
