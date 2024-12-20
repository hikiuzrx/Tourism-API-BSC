import { Test, TestingModule } from '@nestjs/testing';
import { AgenceService } from './agence.service';

describe('AgenceService', () => {
  let service: AgenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgenceService],
    }).compile();

    service = module.get<AgenceService>(AgenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
