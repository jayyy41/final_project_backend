import { Router } from "express";

export function aiRoutes() {
  const router = Router();

  // Week 6 simple AI endpoint (no OpenAI yet)
  router.get("/ping", (_req, res) => {
    res.status(200).json({ message: "AI endpoint working" });
  });

  return router;
}
