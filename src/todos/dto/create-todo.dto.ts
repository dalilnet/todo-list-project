import { Task } from '../schemas/todo.schema';

export class CreateToDodto {
  readonly title: string;
  readonly creationDate: Date;
  readonly tasks: Task[];
}
