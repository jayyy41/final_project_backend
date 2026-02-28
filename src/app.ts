import express from "express";
import { postRoutes } from "./ports/rest/routes/postRoutes";

export function buildApp() {
  const app = express();
  app.use(express.json());

  // Health check
  app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  // Posts routes
  app.use("/api/posts", postRoutes());

  return app;
}
