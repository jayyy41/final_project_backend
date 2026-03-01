import { Router } from "express";
import { getPosts } from "../../../usecases/getPosts";
import { createPost } from "../../../usecases/createPost";

export function postRoutes() {
  const router = Router();

  // GET /api/posts
  router.get("/", async (_req, res) => {
    const posts = await getPosts();
    res.status(200).json(posts);
  });

  // POST /api/posts
  router.post("/", async (req, res) => {
    const { title, body } = req.body;

    // Simple validation (Week 5 will improve)
    if (!title || !body) {
      return res.status(400).json({ message: "title and body are required" });
    }

    const post = await createPost({ title, body });
    res.status(201).json(post);
  });

  return router;
}
