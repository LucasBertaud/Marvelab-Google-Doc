import { Test, TestingModule } from '@nestjs/testing';
import { InterpretationsService } from './interpretations.service';

describe('InterpretationsService', () => {
  let service: InterpretationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterpretationsService],
    }).compile();

    service = module.get<InterpretationsService>(InterpretationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
