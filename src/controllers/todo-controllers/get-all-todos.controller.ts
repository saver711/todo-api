import { Todo } from "@models/todo.model"
import { Request, Response } from "express"

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    // Extract query parameters
    const page = parseInt(req.query.page as string, 10) || 0 // Default to page 0
    const perPage = parseInt(req.query.perPage as string, 10) || 10 // Default to 10 items per page

    // Calculate skip and limit
    const skip = page * perPage
    const limit = perPage

    // Get total count of todos for pagination metadata
    const total = await Todo.countDocuments()

    // Fetch paginated todos
    const todos = await Todo.find()
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "email")

    // Response with todos and pagination metadata
    res.status(200).json({
      todos,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage)
      }
    })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}
