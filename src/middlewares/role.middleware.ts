import { NextFunction, Request, Response } from "express"

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && !roles.includes(req.user?.role)) {
      return res.status(403).json({ message: "Forbidden" })
    }
    next()
  }
}
