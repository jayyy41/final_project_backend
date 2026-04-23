"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = postRoutes;
const express_1 = require("express");
const getPosts_1 = require("../../../usecases/getPosts");
const createPost_1 = require("../../../usecases/createPost");
const appError_1 = require("../../../domain/appError");
function postRoutes() {
    const router = (0, express_1.Router)();
    router.get("/", async (_req, res, next) => {
        try {
            const posts = await (0, getPosts_1.getPosts)();
            res.status(200).json(posts);
        }
        catch (err) {
            next(err);
        }
    });
    router.post("/", async (req, res, next) => {
        try {
            const { title, body } = req.body;
            // Week 5 Validation
            if (!title)
                throw new appError_1.AppError("title is required", 400);
            if (!body)
                throw new appError_1.AppError("body is required", 400);
            const post = await (0, createPost_1.createPost)({ title, body });
            res.status(201).json(post);
        }
        catch (err) {
            next(err);
        }
    });
    return router;
}
//# sourceMappingURL=postRoutes.js.map