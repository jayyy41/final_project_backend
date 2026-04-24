import { Router } from "express";
import { AppError } from "../../../domain/appError";
import { postRepo } from "../../../infrastructure/postRepo.memory";
import { authenticateToken, requireSuperUser } from "../middleware/authorize";

export function superUserRoutes() {
  const router = Router();

  // Super user edit any post
  router.put("/:id", (req, res, next) => {
    authenticateToken(req, res, () => {
      requireSuperUser(req, res, async () => {
        try {
          const id = String(req.params["id"]);
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
    });
  });

  // Super user delete any post
  router.delete("/:id", (req, res, next) => {
    authenticateToken(req, res, () => {
      requireSuperUser(req, res, async () => {
        try {
          const id = String(req.params["id"]);
          const deleted = await postRepo.delete(id);
          if (!deleted) throw new AppError("Post not found", 404);
          res
            .status(200)
            .json({ message: "Post deleted by superuser successfully" });
        } catch (err) {
          next(err);
        }
      });
    });
  });

  return router;
}
