import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export function userMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers["authorization"];

  if (!header) {
    res.status(401).json({ message: "Header missing" });
    return;
  }

  try {
    const decoded = jwt.verify(header as string, JWT_SECRET);

    if (decoded) {
      if (typeof decoded === "string") {
        res.status(411).json({ message: "You are not logged in" });
        return;
      }

      req.userId = (decoded as JwtPayload).id;
      next();
    }
  } catch (e) {
    res.status(411).json({ message: "You are not logged in" });
  }
}
