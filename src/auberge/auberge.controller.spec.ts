import { Test, TestingModule } from '@nestjs/testing';
import { AubergeController } from './auberge.controller';

describe('AubergeController', () => {
  let controller: AubergeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AubergeController],
    }).compile();

    controller = module.get<AubergeController>(AubergeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
