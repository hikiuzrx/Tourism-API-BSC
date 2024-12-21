import { Test, TestingModule } from '@nestjs/testing';
import { PlanTouristiqueService } from './plan-touristique.service';

describe('PlanTouristiqueService', () => {
  let service: PlanTouristiqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanTouristiqueService],
    }).compile();

    service = module.get<PlanTouristiqueService>(PlanTouristiqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
