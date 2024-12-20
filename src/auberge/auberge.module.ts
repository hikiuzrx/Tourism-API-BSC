import { Module } from '@nestjs/common';
import { AubergeService } from './auberge.service';
import { AubergeController } from './auberge.controller';

@Module({
  providers: [AubergeService],
  controllers: [AubergeController]
})
export class AubergeModule {}
