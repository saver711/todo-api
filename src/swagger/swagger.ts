import swaggerJsdoc from "swagger-jsdoc"

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "API documentation for the Todo Backend application."
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server"
      }
    ],
    components: {
      schemas: {
        Todo: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the todo"
            },
            title: {
              type: "string",
              description: "The title of the todo"
            },
            description: {
              type: "string",
              description: "The description of the todo"
            },
            status: {
              type: "string",
              enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
              description: "The current status of the todo"
            },
            createdBy: {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                  description:
                    "The unique identifier of the user who created the todo"
                },
                email: {
                  type: "string",
                  description: "Email of the user who created the todo"
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.ts"] // Points to your route files for API documentation
}

export const swaggerSpec = swaggerJsdoc(swaggerOptions)
