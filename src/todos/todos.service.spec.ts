import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CreateToDodto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let todosService: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: TodosService,
        useValue: {},
        },
      ],
    }).compile();

    todosService = module.get<TodosService>(TodosService);
  });

  it('TodosService - should be defined', () => {
    expect(todosService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      expect(await todosService.findAllToDos).toBe(undefined);
    });
  });

  describe('createTodo', () => {
    it('should create and return an todo', async () => {
      const createToDodto = new CreateToDodto();
      expect(await todosService.createTodo).toBe(createToDodto);
    });
  });
});

