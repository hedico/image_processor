import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../common/types';
import { createTask, getTask } from '../services/task';
import { isValidObjectId } from 'mongoose';
import { isError } from '../common/utils';

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = req.params;

  if (!isValidObjectId(taskId)) {
    const error: HttpError = {
      status: 400,
      name: 'BAD_REQUEST',
      message: 'The task id provided is not valid'
    };
    next(error);
  }

  const result = await getTask(taskId);

  if (isError(result)) {
    return next(result);
  }

  res.send({
    message: 'The task has been retrieved successfully',
    task: result
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

  const result = await createTask(file?.filename || imgUrl);

  if (isError(result)) {
    next(result);
  }

  res.send({
    message: 'The task has been created successfully',
    task: result
  });
};
