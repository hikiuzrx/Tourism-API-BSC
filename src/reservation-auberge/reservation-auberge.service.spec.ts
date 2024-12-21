import { Test, TestingModule } from '@nestjs/testing';
import { ReservationAubergeService } from './reservation-auberge.service';

describe('ReservationAubergeService', () => {
  let service: ReservationAubergeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationAubergeService],
    }).compile();

    service = module.get<ReservationAubergeService>(ReservationAubergeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
