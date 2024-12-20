import { Model, model, Schema } from 'mongoose';
import { Task } from '../interfaces/task';
import { taskStatuses } from '../types';

export interface TaskDocument extends Document, Task {}

export const TaskSchema = new Schema<TaskDocument>({
  status: {
    type: String,
    required: true,
    enum: taskStatuses,
    default: 'pending'
  },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  originalPath: { type: String, required: true },
  imagesList: {
    type: [
      {
        path: { type: String, required: true },
        resolution: { type: String, required: true }
      }
    ],
    default: undefined
  }
});

const TaskModel: Model<TaskDocument> = model<TaskDocument>('Task', TaskSchema);

export default TaskModel;
