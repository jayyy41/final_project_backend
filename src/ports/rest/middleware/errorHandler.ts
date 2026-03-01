import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../domain/appError";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // If it's our AppError, return its status and message
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Default fallback
  console.error(err);
  return res.status(500).json({ message: "Internal Server Error" });
}
