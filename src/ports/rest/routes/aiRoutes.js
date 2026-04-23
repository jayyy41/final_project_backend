"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRoutes = aiRoutes;
const express_1 = require("express");
function aiRoutes() {
    const router = (0, express_1.Router)();
    // Week 6 simple AI endpoint (no OpenAI yet)
    router.get("/ping", (_req, res) => {
        res.status(200).json({ message: "AI endpoint working" });
    });
    return router;
}
//# sourceMappingURL=aiRoutes.js.map