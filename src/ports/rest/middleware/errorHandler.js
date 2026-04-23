"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const appError_1 = require("../../../domain/appError");
function errorHandler(err, _req, res, _next) {
    // If it's our AppError, return its status and message
    if (err instanceof appError_1.AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    // Default fallback
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
}
//# sourceMappingURL=errorHandler.js.map