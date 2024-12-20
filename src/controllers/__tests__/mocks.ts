import { Readable } from 'stream';

export const MULTER_FILE_MOCK: Express.Multer.File = {
  originalname: 'test',
  path: 'test',
  mimetype: 'test',
  fieldname: 'test',
  filename: 'test',
  size: 123,
  destination: 'test',
  encoding: 'test',
  buffer: Buffer.from('test'),
  stream: Readable.from(Buffer.from('test'))
};

export const TASK_MOCK = {
  status: 'pending',
  price: 23.05,
  createdAt: '2024-12-20T00:26:10.694Z',
  originalPath: 'http://imageurl.com',
  _id: '6764b9a2667ff4d7f4714c46',
  __v: 0
};

export const RETURN_CREATED_TASK = {
  status: 'pending',
  price: 23.05,
  createdAt: '2024-12-20T00:26:10.694Z'
};
