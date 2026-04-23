import { Router, Request, Response } from "express";
import { registerUser, loginUser } from "../../../usecases/userUsecases";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }
    const user = await registerUser(username, password);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }
    const result = await loginUser(username, password);
    res.status(200).json({ message: "Login successful", token: result.token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
