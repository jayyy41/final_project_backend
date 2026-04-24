import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = "group10secret";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token required" });
    return;
  }
  try {
    const decoded = jwt.verify(token, SECRET) as any;
    (req as any).user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (!user || user.role !== "admin") {
    res.status(403).json({ message: "Admin access required" });
    return;
  }
  next();
}

export function requireSuperUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = (req as any).user;
  if (!user || (user.role !== "superuser" && user.role !== "admin")) {
    res.status(403).json({ message: "Superuser access required" });
    return;
  }
  next();
}
