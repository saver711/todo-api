import { Todo } from "@models/todo.model"
import { Request, Response } from "express"

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Find the todo by ID and populate the creator's email
    const todo = await Todo.findById(id).populate("createdBy", "email")
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found", errorCode: "TODO_NOT_FOUND" })
    }

    res.status(200).json({ todo })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}
