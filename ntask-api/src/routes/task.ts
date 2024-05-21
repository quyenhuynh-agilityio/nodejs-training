import { Request, Response } from "express";

export function getTaskList(req: Request, res: Response) {
  res.json({
    task: [{ title: "Buy some shoes" }, { title: "Fix notebook" }],
  });
}
