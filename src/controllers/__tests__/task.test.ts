import { getTaskById, processNewTask } from '../task';
import { Request, Response } from 'express';
import { RETURN_CREATED_TASK, TASK_MOCK } from './mocks';
import { createTask } from '../../services/task';
import { isValidObjectId } from 'mongoose';

const res: Partial<Response> = { send: jest.fn() };
const next = jest.fn();

jest.mock('../../services/task', () => ({
  createTask: jest.fn(),
  getTask: jest.fn()
}));
jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'),
  isValidObjectId: jest.fn()
}));

describe('Controller: processNewTask', () => {
  it('Should call next function with 400 status code', async () => {
    const req = { file: undefined, body: { imgUrl: undefined } };

    await processNewTask(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith({
      status: 400,
      name: 'BAD_REQUEST',
      message: 'No image or URL was provided'
    });
  });

  it('Should complete the happy path', async () => {
    const req = {
      file: undefined,
      body: { imgUrl: 'http://example.com/image.jpg' }
    };

    (createTask as jest.Mock).mockResolvedValue(TASK_MOCK);

    await processNewTask(req as Request, res as Response, next);

    expect(res.send).toHaveBeenCalledWith({
      message: 'The task has been created successfully',
      task: TASK_MOCK
    });
  });
});

describe('Controller: getTask', () => {
  const mockRequest = (params: Record<string, any>) => ({
    params
  });

  it('Should call next function with 400 status code', async () => {
    (isValidObjectId as jest.Mock).mockReturnValueOnce(false);

    const req = mockRequest({ taskId: 'invalid_id' });

    await getTaskById(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith({
      status: 400,
      name: 'BAD_REQUEST',
      message: 'The task id provided is not valid'
    });
  });

  it('Should complete the happy path', async () => {
    const req = {
      file: undefined,
      body: { imgUrl: 'http://example.com/image.jpg' }
    };

    (createTask as jest.Mock).mockResolvedValue(RETURN_CREATED_TASK);

    await processNewTask(req as Request, res as Response, next);

    expect(res.send).toHaveBeenCalledWith({
      message: 'The task has been created successfully',
      task: RETURN_CREATED_TASK
    });
  });
});
