import 'dotenv/config'
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
const { PORT } = process.env;

const app = express();
app.use(express.json());

console.log("DIRNAME:", __dirname)
const swaggerDocument = YAML.load(path.join(process.cwd(), 'docs', 'swagger.yaml'));

// Import routes
import UserRoutes from './modules/User/user.routes';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get('/health', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            uptime: process.uptime(),
            message: "OK"
        })
    } catch(e) {
        res.status(500).json({
            success: false,
            message: 'Internal Error - 500'
        })
    }
})

app.use(UserRoutes)

app.listen(Number(PORT), () => {
    console.log(`[🟢 ONLINE] API Rodando em http://localhost:${PORT}`,
    "\n",`[⛑️ HEALTH] http://localhost:${PORT}/health`,
    "\n",`[📖 SWAGGER] http://localhost:${PORT}/api-docs`
    );
})