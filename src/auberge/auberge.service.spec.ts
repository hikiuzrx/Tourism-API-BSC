import { Test, TestingModule } from '@nestjs/testing';
import { AubergeService } from './auberge.service';

describe('AubergeService', () => {
  let service: AubergeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AubergeService],
    }).compile();

    service = module.get<AubergeService>(AubergeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
