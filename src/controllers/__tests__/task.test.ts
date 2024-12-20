import { processNewTask } from '../task';
import { Request, Response } from 'express';
import { TASK_MOCK } from './mocks';
import { createTask } from '../../services/task';

const res: Partial<Response> = { send: jest.fn() };
const next = jest.fn();

jest.mock('../../services/task', () => ({
  createTask: jest.fn()
}));

describe('Controller: processNewTask', () => {
  it('Should return a 400 status code', async () => {
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
