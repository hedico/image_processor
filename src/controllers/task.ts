import { Request, Response } from 'express';

export const getTaskById = async (req: Request, res: Response) => {
  const params = req.params;
  res.send({
    message:
      'This endpoint has been deployed, but does not yet have functionality implemented.',
    params,
  });
};

export const processNewTask = async (req: Request, res: Response) => {
  const body = req.body;
  res.send({
    message:
      'This endpoint has been deployed, but does not yet have functionality implemented.',
    body,
  });
};
