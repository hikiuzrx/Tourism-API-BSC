import { Test, TestingModule } from '@nestjs/testing';
import { TouristiquePlacesService } from './touristique-places.service';

describe('TouristiquePlacesService', () => {
  let service: TouristiquePlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TouristiquePlacesService],
    }).compile();

    service = module.get<TouristiquePlacesService>(TouristiquePlacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
