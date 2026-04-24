import { Router } from "express";
import { getPosts } from "../../../usecases/getPosts";
import { createPost } from "../../../usecases/createPost";
import { AppError } from "../../../domain/appError";
import { postRepo } from "../../../infrastructure/postRepo.memory";

export function postRoutes() {
  const router = Router();

  // Get all posts
  router.get("/", async (_req, res, next) => {
    try {
      const posts = await getPosts();
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  });

  // Create a post
  router.post("/", async (req, res, next) => {
    try {
      const { title, body, authorId } = req.body;
      if (!title) throw new AppError("title is required", 400);
      if (!body) throw new AppError("body is required", 400);
      if (!authorId) throw new AppError("authorId is required", 400);
      const post = await createPost({ title, body, authorId });
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  });

  // Edit a post
  router.put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, body } = req.body;
      if (!title) throw new AppError("title is required", 400);
      if (!body) throw new AppError("body is required", 400);
      const post = await postRepo.update(id, title, body);
      if (!post) throw new AppError("Post not found", 404);
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  });

  // Delete a post
  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await postRepo.delete(id);
      if (!deleted) throw new AppError("Post not found", 404);
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      next(err);
    }
  });

  // Like a post
  router.post("/:id/like", async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await postRepo.like(id);
      if (!post) throw new AppError("Post not found", 404);
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
