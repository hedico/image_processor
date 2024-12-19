import { TaskStatus } from '../types';

export interface Task {
  status: TaskStatus;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  originalPath: string;
  imagesList?: {
    path: string;
    resolution: string;
  }[];
}
