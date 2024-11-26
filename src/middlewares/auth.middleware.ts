import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "")
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication required", errorCode: "MISSING_TOKEN" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    //@ts-ignore
    req.user = decoded
    next()
  } catch (error) {
    //@ts-ignore
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired", errorCode: "TOKEN_EXPIRED" })
    }
    res
      .status(401)
      .json({ message: "Invalid token", errorCode: "INVALID_TOKEN" })
  }
}
