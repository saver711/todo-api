# Todo API

This is a backend API for managing todos with user authentication and authorization. The project is built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**, with API documentation provided via **Swagger**.

## Features

- **User Authentication**:
  - Admin user registration.
  - Login functionality with JWT authentication.
- **Todo Management**:
  - CRUD operations for todos.
  - Pagination support for listing todos.
- **Swagger API Documentation**.

---

## Prerequisites

- Mongodb cluster

---

## Environment Variables

Create a `.env` file in the root directory of the project with the following variables:

```plaintext
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster-name>.mongodb.net/ # MongoDB connection string
JWT_SECRET=your_secret_key    # Secret key for signing JWT tokens (search how to create one via CMD)
```

---

## Swagger

[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## Author

[@AhmedHassan](https://www.linkedin.com/in/ahmedhassan711/)
