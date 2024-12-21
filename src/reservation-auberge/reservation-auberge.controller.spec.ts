import { Test, TestingModule } from '@nestjs/testing';
import { ReservationAubergeController } from './reservation-auberge.controller';

describe('ReservationAubergeController', () => {
  let controller: ReservationAubergeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationAubergeController],
    }).compile();

    controller = module.get<ReservationAubergeController>(ReservationAubergeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
