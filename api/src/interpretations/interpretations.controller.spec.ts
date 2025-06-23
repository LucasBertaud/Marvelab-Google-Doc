import { Test, TestingModule } from '@nestjs/testing';
import { InterpretationsController } from './interpretations.controller';
import { InterpretationsService } from './interpretations.service';

describe('InterpretationsController', () => {
  let controller: InterpretationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterpretationsController],
      providers: [InterpretationsService],
    }).compile();

    controller = module.get<InterpretationsController>(InterpretationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
