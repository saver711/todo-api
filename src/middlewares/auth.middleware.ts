import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "")
  if (!token)
    return res.status(401).json({
      message: "Authentication required",
      errorCode: "NO_TOKEN_PROVIDED"
    })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    //@ts-ignore
    req.user = decoded as jwt.JwtPayload
    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}
