import bcrypt from "bcrypt"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../../models/user.model"

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user)
      return res
        .status(404)
        .json({ message: "الايميل دا مش صح", errorCode: "USER_DOESNT_EXIST" })

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid)
      return res
        .status(401)
        .json({
          message: "credentials مش صح",
          errorCode: "INVALID_CREDENTIALS"
        })

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    )
    res.status(200).json({ message: "Login successful", accessToken })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}
