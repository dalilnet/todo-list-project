import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Test } from '@nestjs/testing';

describe('TodosController', () => {
  let todosController: TodosController;
  let todosService: TodosService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService],
    }).compile();

    todosService = moduleRef.get<TodosService>(TodosService);
    todosController = moduleRef.get<TodosController>(TodosController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
//jest.spyOn(todosService, 'findAllToDos').mockImplementation(() => result);

     /// expect(await todosController.findAll()).toBe(result);
    });
  });
});
