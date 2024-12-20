import { Module } from '@nestjs/common';
import { AgenceService } from './agence.service';
import { AgenceController } from './agence.controller';

@Module({
  controllers: [AgenceController],
  providers: [AgenceService],
})
export class AgenceModule {}
