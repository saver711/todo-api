import { Todo } from "@models/todo.model"
import { Request, Response } from "express"

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const todo = await Todo.findById(id)
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" })
    }

    await todo.deleteOne()
    res.status(200).json({ message: "Todo deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}
