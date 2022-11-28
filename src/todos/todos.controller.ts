import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  HttpStatus,
  Param,
  Post,
  Res,
  Logger
} from '@nestjs/common';
import { CreateToDodto } from './dto/create-todo.dto';
import { UpdateTaskdto } from './dto/update-task.dto';
import { IToDo } from './interface/ITodo.interface';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {

  private readonly logger = new Logger(TodosController.name);

  /**
   * 
   * @param todosService 
   */
  constructor(private readonly todosService: TodosService) {}

  /**
   * create todo endpoint
   * @param response
   * @param createTodoDto
   * @returns
   */
  @Post()
  async create(@Res() response, @Body() createTodoDto: CreateToDodto) {
    try {
      const newTodo = await this.todosService.createTodo(createTodoDto);

      this.logger.log(`create new todo`);
      
      return response.status(HttpStatus.CREATED).json(newTodo);
    } catch (err) {
      this.logger.error(err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "Nous n'arrivons pas a créer un todo",
        error: 'Bad Request',
      });
    }
  }

  /**
   * get all todo endpoint
   * @param response
   * @returns
   */
  @Get()
  async findAll(@Res() response): Promise<IToDo[]> {
    try {
      const todos = await this.todosService.findAllToDos();

      this.logger.log(`get all todos`);
      return response.status(HttpStatus.OK).json(todos);
    } catch (err) {
      this.logger.error(err);
      return response.status(err.status).json(err.response);
    }
  }

  /**
   * get one  todo endpoint
   * @param response 
   * @param toDoId 
   * @returns 
   */
  @Get('/:id')
  async findOne(@Res() response, @Param('id') toDoId: string) {
    try {
      const todo = await this.todosService.findOne(toDoId);

      this.logger.log(`get todo id = ${toDoId}`);
      return response.status(HttpStatus.OK).json(todo);
    } catch (err) {
      this.logger.error(err);
      return response.status(err.status).json(err.response);
    }
  }

  /**
   * get and update one task endpoint
   * @param response  
   * @param toDoId 
   * @param taskId 
   * @param createTaskdto 
   * @returns 
   */
  @Patch('/:id/task/:taskid')
  async updateOneTask(
    @Res() response,
    @Param('id') toDoId: string,
    @Param('taskid') taskId: string,
    @Body() updateTaskdto: UpdateTaskdto,
  ) {
    try {    
      await this.todosService.updateOneTask(
        toDoId,
        taskId,
        updateTaskdto.state,
      );
      this.logger.log(`update state of task id = ${taskId}`);
      const taskToUpdate = await this.todosService.findOne(toDoId);
      return response.status(HttpStatus.OK).json(taskToUpdate);
    } catch (err) {
      this.logger.error(err);
      return response.status(err.status).json(err.response);
    }
  }

  /**
   * delete an todo endpoint
   * @param response 
   * @param toDOId 
   * @returns 
   */
  @Delete('/:id')
  async delete(@Res() response, @Param('id') toDOId: string) {
    try {
      const todoDeleted = await this.todosService.delete(toDOId);
      return response.status(HttpStatus.OK).json(todoDeleted);
    } catch (err) {
      this.logger.error(err);
      return response.status(err.status).json(err.response);
    }

  }
}
