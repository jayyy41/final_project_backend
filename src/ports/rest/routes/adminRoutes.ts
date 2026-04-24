import { Router, Request, Response, NextFunction } from "express";
import { getUsers } from "../../../usecases/userUsecases";
import { postRepo } from "../../../infrastructure/postRepo.memory";
import { commentRepo } from "../../../infrastructure/commentRepo.memory";

export function adminRoutes() {
  const router = Router();

  // Get site statistics
  router.get(
    "/stats",
    async (_req: Request, res: Response, next: NextFunction) => {
      try {
        const users = getUsers();
        const posts = await postRepo.getAll();
        const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);

        // Get all comments across all posts
        const allComments = await Promise.all(
          posts.map((post) => commentRepo.getByPostId(post.id)),
        );
        const totalComments = allComments.flat().length;

        res.status(200).json({
          totalUsers: users.length,
          totalPosts: posts.length,
          totalComments: totalComments,
          totalLikes: totalLikes,
          users: users,
        });
      } catch (err) {
        next(err);
      }
    },
  );

  return router;
}
