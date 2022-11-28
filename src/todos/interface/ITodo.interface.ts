import { Document } from 'mongoose';

/**
 *
 */
export interface IToDo extends Document {
  readonly title: string;
  readonly createdAt: Date;
}
