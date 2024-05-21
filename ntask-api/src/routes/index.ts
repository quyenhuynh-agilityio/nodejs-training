import { Request, Response } from "express";

export function getNTask(req: Request, res: Response) {
  res.json({ status: "NTask API" });
}
