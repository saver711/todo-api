import bcrypt from "bcrypt"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../../models/user.model"

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exists", errorCode: "USER_EXISTS" })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      email,
      password: hashedPassword,
      role: "ADMIN"
    })
    await newUser.save()

    const accessToken = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET!,
      { expiresIn: "4h" }
    )

    res
      .status(201)
      .json({ message: "Admin user created successfully", accessToken })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}
