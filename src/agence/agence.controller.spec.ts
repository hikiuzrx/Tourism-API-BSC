import { Test, TestingModule } from '@nestjs/testing';
import { AgenceController } from './agence.controller';
import { AgenceService } from './agence.service';

describe('AgenceController', () => {
  let controller: AgenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgenceController],
      providers: [AgenceService],
    }).compile();

    controller = module.get<AgenceController>(AgenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
