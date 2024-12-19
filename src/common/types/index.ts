import { Task } from '../interfaces/task';

// Possible task status
export const taskStatus = ['pending', 'completed', 'failed'] as const;
// Type created with the possible states of the task
export type TaskStatus = (typeof taskStatus)[number];

export type ImageAction = (
  imageUrl?: string,
  file?: Express.Multer.File
) => Promise<Task>;

export type HttpError = {
  status: number;
} & Error;
