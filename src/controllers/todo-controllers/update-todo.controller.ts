import { Request, Response } from "express"
import { Todo } from "@models/todo.model"

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, deadline } = req.body

    // Find the todo by ID
    const todo = await Todo.findById(id)
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found", errorCode: "TODO_NOT_FOUND" })
    }

    // Update allowed fields
    if (title !== undefined) todo.title = title
    if (description !== undefined) todo.description = description
    if (deadline !== undefined) todo.deadline = deadline

    // Save the updated document
    const updatedTodo = await todo.save()

    res
      .status(200)
      .json({ message: "Todo updated successfully", todo: updatedTodo })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}
