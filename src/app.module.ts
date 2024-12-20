import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClubModule } from './club/club.module';
import { AubergeModule } from './auberge/auberge.module';
import { AgenceModule } from './agence/agence.module';

@Module({
  imports: [DbModule, UserModule, AuthModule, ClubModule, AubergeModule, AgenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
