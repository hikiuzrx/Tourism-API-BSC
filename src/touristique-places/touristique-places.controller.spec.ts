import { Test, TestingModule } from '@nestjs/testing';
import { TouristiquePlacesController } from './touristique-places.controller';
import { TouristiquePlacesService } from './touristique-places.service';

describe('TouristiquePlacesController', () => {
  let controller: TouristiquePlacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristiquePlacesController],
      providers: [TouristiquePlacesService],
    }).compile();

    controller = module.get<TouristiquePlacesController>(TouristiquePlacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
