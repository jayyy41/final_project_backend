import express from "express";
import { postRoutes } from "./ports/rest/routes/postRoutes";
import { errorHandler } from "./ports/rest/middleware/errorHandler";

export function buildApp() {
  const app = express();
  app.use(express.json());

  // Health check
  app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  // Posts routes
  app.use("/api/posts", postRoutes());
  app.use(errorHandler);

  return app;
}
