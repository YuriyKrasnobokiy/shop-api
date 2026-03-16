import "dotenv/config";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { swaggerSpec, swaggerUi } from "./config/swagger.js";
import healthRoutes from "./routes/health.routes.js";
import productsRoutes from "./routes/products.routes.js";
import { db } from "./db/postgres.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", healthRoutes);
app.use("/products", productsRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
