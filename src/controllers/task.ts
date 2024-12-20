import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../common/types';
import { createTask } from '../services/task';

export const getTaskById = async (req: Request, res: Response) => {
  const params = req.params;
  res.send({
    message: 'The task has been retrieved successfully',
    params
  });
};

export const processNewTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { file, body } = req;
  const { imgUrl } = body;
  if (!file && !imgUrl) {
    const error: HttpError = {
      status: 400,
      name: 'BAD_REQUEST',
      message: 'No image or URL was provided'
    };
    return next(error);
  }

  const task = await createTask(file?.filename || imgUrl);

  res.send({
    message: 'The task has been created successfully',
    task
  });
};
