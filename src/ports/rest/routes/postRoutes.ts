import { Router } from "express";
import { getPosts } from "../../../usecases/getPosts";
import { createPost } from "../../../usecases/createPost";
import { AppError } from "../../../domain/appError";

export function postRoutes() {
  const router = Router();

  router.get("/", async (_req, res, next) => {
    try {
      const posts = await getPosts();
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const { title, body } = req.body;

      // Week 5 Validation
      if (!title) throw new AppError("title is required", 400);
      if (!body) throw new AppError("body is required", 400);

      const post = await createPost({ title, body });
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
