import { Todo } from "@models/todo.model"
import { Request, Response } from "express"

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, status } = req.body

    // Find the todo by ID
    const todo = await Todo.findById(id)
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" })
    }

    // Update the todo fields
    if (title !== undefined) todo.title = title
    if (description !== undefined) todo.description = description
    if (status !== undefined) todo.status = status

    // Save the updated document
    const updatedTodo = await todo.save()

    res
      .status(200)
      .json({ message: "Todo updated successfully", todo: updatedTodo })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}
