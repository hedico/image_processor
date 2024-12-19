import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../common/types';
import { imageActions } from '../common/utils/action-map';

export const getTaskById = async (req: Request, res: Response) => {
  const params = req.params;
  res.send({
    message: 'This endpoint is in development',
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

  const actionName = file ? 'upload' : 'download';

  const action = imageActions[actionName];

  // Execution of the action needed to process the image
  const result = await action();

  res.send({
    message: 'This endpoint is in development',
    result
  });
};
