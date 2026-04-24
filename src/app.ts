import express from "express";
import { postRoutes } from "./ports/rest/routes/postRoutes";
import { errorHandler } from "./ports/rest/middleware/errorHandler";
import { requestLogger } from "./ports/rest/middleware/requestLogger";
import { aiRoutes } from "./ports/rest/routes/aiRoutes";
import userRoutes from "./ports/rest/routes/userRoutes";
import { commentRoutes } from "./ports/rest/routes/commentRoutes";
import { adminRoutes } from "./ports/rest/routes/adminRoutes";
import { superUserRoutes } from "./ports/rest/routes/SuperUserRoutes";

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

  // Admin routes
  app.use("/api/admin", adminRoutes());

  // Super user routes
  app.use("/api/superuser/posts", superUserRoutes());

  // AI routes
  app.use("/api/ai", aiRoutes());

  app.use(errorHandler);

  return app;
}
