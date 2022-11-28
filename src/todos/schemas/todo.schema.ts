/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { TodoStateEnum } from '../common/enums';
import { Document } from 'mongoose';
export type ToDoDocument = HydratedDocument<ToDo>;

/**
 * todolist
 */
@Schema({ _id: true })
export class Task extends Document {
    @Prop({ type: String, required: true })
    label: string;
    @Prop({ type: String, enum: Object.values(TodoStateEnum), default: TodoStateEnum.TODO })
    state: string
}

export const TaskSchema = SchemaFactory.createForClass(Task);

/**
 * 
 */
@Schema()
export class ToDo extends Document {

    @Prop({ type: String, required: true })
    title: string;
    @Prop({ type: 'Date', default: now() })
    createdAt: Date;
    @Prop({ type: [TaskSchema] })
    tasks: Task[];
}



export const ToDoSchema = SchemaFactory.createForClass(ToDo);
