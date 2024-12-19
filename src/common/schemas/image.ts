import { Model, Schema, model } from 'mongoose';
import { Image } from '../interfaces/image';

interface ImageDocument extends Document, Image {}

const ImageSchema = new Schema<ImageDocument>({
  parentId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  originalPath: { type: String, required: true },
  variants: [
    {
      path: { type: String, required: true },
      resolution: { type: String, required: true },
    },
  ],
});

const ImageModel: Model<ImageDocument> = model<ImageDocument>(
  'Image',
  ImageSchema
);

export default ImageModel;
