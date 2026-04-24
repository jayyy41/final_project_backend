import { Router, Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { commentRepo } from "../../../infrastructure/commentRepo.memory";
import { AppError } from "../../../domain/appError";

interface PostParams {
  postId: string;
  id?: string;
}

export function commentRoutes() {
  const router = Router({ mergeParams: true });

  // Get all comments for a post
  router.get(
    "/",
    async (req: Request<PostParams>, res: Response, next: NextFunction) => {
      try {
        const { postId } = req.params;
        const comments = await commentRepo.getByPostId(postId);
        res.status(200).json(comments);
      } catch (err) {
        next(err);
      }
    },
  );

  // Add a comment to a post
  router.post(
    "/",
    async (req: Request<PostParams>, res: Response, next: NextFunction) => {
      try {
        const { postId } = req.params;
        const { authorId, body } = req.body;
        if (!authorId) throw new AppError("authorId is required", 400);
        if (!body) throw new AppError("body is required", 400);
        const comment = await commentRepo.create({
          id: randomUUID(),
          postId,
          authorId,
          body,
          createdAt: new Date().toISOString(),
        });
        res.status(201).json(comment);
      } catch (err) {
        next(err);
      }
    },
  );

  // Edit a comment
  router.put(
    "/:id",
    async (req: Request<PostParams>, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const { body } = req.body;
        if (!body) throw new AppError("body is required", 400);
        const comment = await commentRepo.update(id!, body);
        if (!comment) throw new AppError("Comment not found", 404);
        res.status(200).json(comment);
      } catch (err) {
        next(err);
      }
    },
  );

  // Delete a comment
  router.delete(
    "/:id",
    async (req: Request<PostParams>, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const deleted = await commentRepo.delete(id!);
        if (!deleted) throw new AppError("Comment not found", 404);
        res.status(200).json({ message: "Comment deleted successfully" });
      } catch (err) {
        next(err);
      }
    },
  );

  return router;
}
