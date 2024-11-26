import { Request, Response } from "express"
import { Todo } from "../../models/todo.model"

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body
    console.log(`🚀 ~ createTodo ~ req user:`, req.user)
    const newTodo = new Todo({
      title,
      description,
      createdBy: req.user?.id
    })
    await newTodo.save()

    res
      .status(201)
      .json({ message: "Todo created successfully", todo: newTodo })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}
