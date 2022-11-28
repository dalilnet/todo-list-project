import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Task, ToDo, ToDoDocument } from './schemas/todo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateToDodto } from './dto/create-todo.dto';
import { IToDo } from './interface/ITodo.interface';
import { TodoStateEnum } from './common/enums';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(ToDo.name) private readonly todoModel: Model<IToDo>,
  ) { }

  /**
   * create a new todo
   * @param createToDodto
   * @returns
   */
  async createTodo(createToDodto: CreateToDodto): Promise<IToDo> {
    const createdCat = await new this.todoModel(createToDodto);
    return createdCat.save();
  }

  /**
   * get all todo
   * @returns
   */
  async findAllToDos(): Promise<IToDo[]> {
    const toDoData = await this.todoModel.find();
    if (!toDoData || toDoData.length == 0) {
      throw new NotFoundException('Students data not found!');
    }

    return toDoData;
  }

  /**
   * get an todo by id
   * @param toDoId
   * @returns
   */
  async findOne(toDoId: string): Promise<IToDo> {
    return await this.todoModel.findById(toDoId).exec();
  }

  async delete(id: string) {
    const deletedTodo = await this.todoModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedTodo;
  }

  /**
   * 
   * @param todoId 
   * @param taskId 
   * @param state 
   * @returns 
   */
  async updateOneTask(todoId: string, taskId: string, state: string) {
    const updatedTask = await this.todoModel
      .findByIdAndUpdate(
        {
          _id: todoId,
          'tasks._id': taskId,
        },
        {
          $set: {
            'tasks.state': state,
          },
        },
      )
      .exec();

    return updatedTask;
  }
}
