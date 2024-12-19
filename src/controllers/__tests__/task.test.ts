import { processNewTask } from '../task';
import { Request, Response } from 'express';
import { MULTER_FILE_MOCK } from './mocks';
import { imageActions } from '../../common/utils/action-map';

jest.mock('../../common/utils/action-map', () => ({
  imageActions: {
    upload: jest.fn(),
    download: jest.fn()
  }
}));

const res: Partial<Response> = { send: jest.fn() };
const next = jest.fn();

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

  it('Should call upload action in imageActions', async () => {
    const req = { file: MULTER_FILE_MOCK, body: { imgUrl: undefined } };

    await processNewTask(req as Request, res as Response, next);

    expect(imageActions.upload).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      message: 'The task has been created successfully'
    });
  });

  it('Should call download action in imageActions', async () => {
    const req = {
      file: undefined,
      body: { imgUrl: 'http://example.com/image.jpg' }
    };

    await processNewTask(req as Request, res as Response, next);

    expect(imageActions.download).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      message: 'The task has been created successfully'
    });
  });
});
