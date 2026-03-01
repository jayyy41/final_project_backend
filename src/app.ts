import express from "express";
import { postRoutes } from "./ports/rest/routes/postRoutes";
import { errorHandler } from "./ports/rest/middleware/errorHandler";
import { requestLogger } from "./ports/rest/middleware/requestLogger";
import { aiRoutes } from "./ports/rest/routes/aiRoutes";

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
  app.use("/api/ai", aiRoutes());
  app.use(errorHandler);

  return app;
}
