import TaskModel from '../common/schemas/task';

const DEFAULT_STATUS = 'pending';

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
    return task;
  } catch (err: any) {
    const error: Error = {
        name: 'INTERNAL_ERROR',
        message: err.message,
    }
    return error;
  }
};
