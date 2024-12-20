import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';

@Module({
  providers: [ClubService],
  controllers: [ClubController]
})
export class ClubModule {}
