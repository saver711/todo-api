import { Todo } from "@models/todo.model"
import { Request, Response } from "express"
export const completeTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Find the todo by ID
    const todo = await Todo.findById(id)
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found", errorCode: "TODO_NOT_FOUND" })
    }

    // Update the status to COMPLETED
    todo.status = "COMPLETED"
    const updatedTodo = await todo.save()

    res
      .status(200)
      .json({ message: "Todo marked as completed", todo: updatedTodo })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}
