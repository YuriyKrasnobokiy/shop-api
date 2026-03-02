import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", healthRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});