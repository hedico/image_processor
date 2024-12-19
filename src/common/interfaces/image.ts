import { Types } from 'mongoose';

export interface Variant {
  path: string;
  resolution: string;
};

export interface Image {
  parentId: Types.ObjectId;
  originalPath: string;
  variants: Variant[];
}
