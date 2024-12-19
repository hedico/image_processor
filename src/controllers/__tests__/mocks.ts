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
