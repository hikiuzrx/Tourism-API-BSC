import { Test, TestingModule } from '@nestjs/testing';
import { PlanTouristiqueController } from './plan-touristique.controller';

describe('PlanTouristiqueController', () => {
  let controller: PlanTouristiqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanTouristiqueController],
    }).compile();

    controller = module.get<PlanTouristiqueController>(PlanTouristiqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
