import { Router } from "express";

export function postRoutes() {
  const router = Router();

  router.get("/", (_req, res) => {
    res.status(200).json([
      {
        id: 1,
        title: "Hello Forum",
        body: "This is my first post",
      },
    ]);
  });

  return router;
}
