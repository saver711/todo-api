import mongoose from "mongoose"

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
      default: "PENDING"
    },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
)

export const Todo = mongoose.model("Todo", TodoSchema)
