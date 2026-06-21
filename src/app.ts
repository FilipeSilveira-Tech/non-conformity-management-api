import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
const { PORT } = process.env;

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load(
  path.join(process.cwd(), "docs", "swagger.yaml"),
);

// Import routes
import UserRoutes from "./modules/User/user.routes";
import SupplierRoutes from "./modules/Supplier/supplier.routes";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // ROTA: Documentação Swagger
app.get("/health", (req, res) => {
  // ROTA: Saude da API
  res.status(200).json({
    success: true,
    uptime: process.uptime(),
    message: "OK",
  });
});

app.use(UserRoutes); // ROTA: Users
app.use(SupplierRoutes); // ROTA: Supplier

app.listen(Number(PORT), () => {
  console.log(
    `[🟢 ONLINE] API Rodando em http://localhost:${PORT}`,
    "\n",
    `[⛑️ HEALTH] http://localhost:${PORT}/health`,
    "\n",
    `[📖 SWAGGER] http://localhost:${PORT}/api-docs`,
  );
});
