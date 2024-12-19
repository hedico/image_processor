import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { status } = err || 500;
  console.error(err);

  res.status(status).json({
    success: false,
    err
  });
};
