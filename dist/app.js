"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const passengerRoutes_1 = __importDefault(require("./routes/passengerRoutes"));
const driverRoutes_1 = __importDefault(require("./routes/driverRoutes"));
const rideRoutesV2_1 = __importDefault(require("./routes/rideRoutesV2"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const ratingRoutes_1 = __importDefault(require("./routes/ratingRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Swagger Documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Kenda API Documentation',
}));
// Swagger JSON
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger_1.swaggerSpec);
});
// Routes
app.use('/auth', authRoutes_1.default);
app.use('/passengers', passengerRoutes_1.default);
app.use('/drivers', driverRoutes_1.default);
app.use('/rides', rideRoutesV2_1.default);
app.use('/transactions', transactionRoutes_1.default);
app.use('/ratings', ratingRoutes_1.default);
app.get('/', (req, res) => {
    res.json({
        message: 'Kenda API is running',
        documentation: '/api-docs',
        health: '/health',
    });
});
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
exports.default = app;
