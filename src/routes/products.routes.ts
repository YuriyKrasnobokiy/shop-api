import { Router } from "express";
import { createNewProduct, getProductById, getProductsList } from "../controllers/products.controller.js";
import { getAllProductCategories } from "../controllers/categories.controller.js";
import { validateBody } from "../middlewares/validate-body.middleware.js";
import { createProductSchema } from "../schemas/product.schema.js";


const router = Router();

router.get("/", getProductsList);
router.post("/", validateBody(createProductSchema), createNewProduct);

router.get("/categories", getAllProductCategories);

router.get("/:id", getProductById);


export default router;
