import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../common/types';
import { createTask, getTask } from '../services/task';
import { isValidObjectId } from 'mongoose';
import { isError } from '../common/utils';
import { downloadImage } from '../services/download-image';
import path from 'path';

const inputDirectory = 'input/';

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
  try {
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

    const imagePath = file
      ? path.join(inputDirectory, file.filename)
      : await downloadImage(imgUrl);

    if (isError(imagePath)) {
      return next(imagePath);
    }

    const result = await createTask(imagePath);

    if (isError(result)) {
      next(result);
    }

    res.send({
      message: 'The task has been created successfully',
      task: result
    });
  } catch (err: any) {
    const error: Error = {
      name: 'INTERNAL_ERROR',
      message: err.message
    };
    return next(error);
  }
};
