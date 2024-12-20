import ImageModel from '../common/schemas/image';
import TaskModel from '../common/schemas/task';
import mongoose from 'mongoose';
import { HttpError } from '../common/types';

const DEFAULT_STATUS = 'pending';

export const getTask = async (taskId: string) => {
  try {
    const taskObjectId = new mongoose.Types.ObjectId(taskId);
    const task = await TaskModel.findById(taskObjectId).lean();

    if (!task) {
      const error: HttpError = {
        status: 404,
        name: 'NOT_FOUND',
        message: `No task was found with id ${taskId}`
      };
      return error;
    }

    const image = await ImageModel.findOne({ parentId: taskObjectId }).lean();

    const { status, price, createdAt, updatedAt } = task;

    if (image && image.variants.length && task.status === 'completed') {
      return {
        status,
        price,
        imageList: image.variants,
        createdAt,
        updatedAt
      };
    }

    return {
      status,
      price,
      createdAt
    };
  } catch (err: any) {
    const error: Error = {
      name: 'INTERNAL_ERROR',
      message: err.message
    };
    return error;
  }
};

export const createTask = async (originalPath: string) => {
  try {
    const price = Number((Math.random() * (50 - 5) + 5).toFixed(2));
    const task = new TaskModel({
      originalPath,
      status: DEFAULT_STATUS,
      price,
      createdAt: new Date().toISOString()
    });
    await task.save();
    return {
      status: task.status,
      price: task.price,
      createdAt: task.createdAt
    };
  } catch (err: any) {
    const error: Error = {
      name: 'INTERNAL_ERROR',
      message: err.message
    };
    return error;
  }
};
