import { completeTodo } from "@controllers/todo-controllers/complete-todo.controller"
import { getTodoById } from "@controllers/todo-controllers/get-todo-by-id.controller"
import { startTodo } from "@controllers/todo-controllers/start-todo.controller"
import { updateTodo } from "@controllers/todo-controllers/update-todo.controller"
import express, { NextFunction, Request, Response } from "express"
import { createTodo } from "../controllers/todo-controllers/create-todo.controller"
import { deleteTodo } from "../controllers/todo-controllers/delete-todo.controller"
import { getAllTodos } from "../controllers/todo-controllers/get-all-todos.controller"
import { authenticate } from "../middlewares/auth.middleware"
import { authorizeRole } from "../middlewares/role.middleware"

const router = express.Router()

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos with pagination
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Zero-indexed page number
 *         required: false
 *         schema:
 *           type: integer
 *       - name: perPage
 *         in: query
 *         description: Number of todos per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of todos with pagination metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     perPage:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 todo:
 *                   $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a single todo by ID
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todo:
 *                   $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Edit a todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 todo:
 *                   $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/todos/{id}/start:
 *   post:
 *     summary: Start a todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo to start
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 todo:
 *                   $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/todos/{id}/complete:
 *   post:
 *     summary: Mark a todo as completed
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo to mark as completed
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo marked as completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 todo:
 *                   $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal Server Error
 */

router.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next)
  },
  (req, res, next) => {
    authorizeRole(["ADMIN", "SUPER_ADMIN"])(req, res, next)
  },
  createTodo
)
router.post(
  "/:id/start",
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next)
  },
  (req, res, next) => {
    authorizeRole(["ADMIN", "SUPER_ADMIN"])(req, res, next)
  },
  (req, res) => {
    startTodo(req, res)
  }
)
router.post(
  "/:id/complete",
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next)
  },
  (req, res, next) => {
    authorizeRole(["ADMIN", "SUPER_ADMIN"])(req, res, next)
  },
  (req, res) => {
    completeTodo(req, res)
  }
)
router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next)
  },
  (req, res, next) => {
    authorizeRole(["ADMIN", "SUPER_ADMIN"])(req, res, next)
  },
  getAllTodos
)
router.delete(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next)
  },
  (req, res, next) => {
    authorizeRole(["SUPER_ADMIN"])(req, res, next)
  },
  (req, res) => {
    deleteTodo(req, res)
  }
)
router.get(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next)
  },
  (req, res, next) => {
    authorizeRole(["ADMIN", "SUPER_ADMIN"])(req, res, next)
  },
  (req, res) => {
    getTodoById(req, res)
  }
)
router.put(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next)
  },
  (req, res, next) => {
    authorizeRole(["ADMIN", "SUPER_ADMIN"])(req, res, next)
  },
  (req, res) => {
    updateTodo(req, res)
  }
)

export default router
