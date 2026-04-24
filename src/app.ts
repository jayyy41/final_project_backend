import express from "express";
import { postRoutes } from "./ports/rest/routes/postRoutes";
import { errorHandler } from "./ports/rest/middleware/errorHandler";
import { requestLogger } from "./ports/rest/middleware/requestLogger";
import { aiRoutes } from "./ports/rest/routes/aiRoutes";
import userRoutes from "./ports/rest/routes/userRoutes";
import { commentRoutes } from "./ports/rest/routes/commentRoutes";

export function buildApp() {
  const app = express();
  app.use(express.json());
  app.use(requestLogger);

  // Health check
  app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  // Posts routes
  app.use("/api/posts", postRoutes());

  // Comments routes (nested under posts)
  app.use("/api/posts/:postId/comments", commentRoutes());

  // User routes
  app.use("/api/user", userRoutes);

  // AI routes
  app.use("/api/ai", aiRoutes());

  app.use(errorHandler);

  return app;
}
