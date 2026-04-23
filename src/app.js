"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const express_1 = __importDefault(require("express"));
const postRoutes_1 = require("./ports/rest/routes/postRoutes");
const errorHandler_1 = require("./ports/rest/middleware/errorHandler");
const requestLogger_1 = require("./ports/rest/middleware/requestLogger");
const aiRoutes_1 = require("./ports/rest/routes/aiRoutes");
function buildApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(requestLogger_1.requestLogger);
    // Health check
    app.get("/health", (_req, res) => {
        res.status(200).json({ ok: true });
    });
    // Posts routes
    app.use("/api/posts", (0, postRoutes_1.postRoutes)());
    app.use("/api/ai", (0, aiRoutes_1.aiRoutes)());
    app.use(errorHandler_1.errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map