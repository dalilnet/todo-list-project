import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Test } from '@nestjs/testing';
import { IToDo } from './interface/ITodo.interface';
import { HttpStatus } from '@nestjs/common';
import { ToDosModule } from './todos.module';
import { CreateToDodto } from './dto/create-todo.dto';

describe('TodosController', () => {
  let todosController: TodosController;
  let todosService: TodosService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            findAllToDos: jest.fn(),
            findOne: jest.fn(),
            createTodo: jest.fn(),
          },
        },
      ],
    }).compile();

    todosService = moduleRef.get<TodosService>(TodosService);
    todosController = moduleRef.get<TodosController>(TodosController);
  });

  it('TodosController - should be defined', () => {
    expect(todosController).toBeDefined();
  });

  describe('findAll', () => {
    const response = {
      json: (body?: any) => { },
      status: (code: number) => HttpStatus.OK,
    };

    it('should return an array of todos', async () => {
      const result: IToDo[] = [];

      jest
        .spyOn(todosService, 'findAllToDos')
        .mockImplementation(
          async (): Promise<IToDo[]> => Promise.resolve(result),
        );

      expect(await todosController.findAll(response)).toBe(result);
    });
  });

  describe('findOne', () => {
    const response = {
      json: (body?: any) => { },
      status: (code: number) => HttpStatus.OK,
    };

    it('should return an todo', async () => {
      const result: IToDo = null;

      jest
        .spyOn(todosService, 'findOne')
        .mockImplementation(
          async (): Promise<IToDo> => Promise.resolve(result),
        );

      expect(await todosController.findOne(response, 'XXXXXXX')).toBe(result);
    });
  });

  describe('create', () => {
    const response = {
      json: (body?: any) => { },
      status: (code: number) => HttpStatus.OK,
    };

    it('should return an todo after create it', async () => {
      const result: IToDo = null;
      const createDto = new CreateToDodto();
      jest
        .spyOn(todosService, 'createTodo')
        .mockImplementation(
          async (): Promise<IToDo> => Promise.resolve(result),
        );

      expect(await todosController.create(response, createDto)).toBe(result);
    });
  });
});
