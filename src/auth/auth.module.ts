import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClubService } from 'src/club/club.service';
import { AgenceService } from 'src/agence/agence.service';
import { AubergeService } from 'src/auberge/auberge.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET, // Secret for access token
      signOptions: { expiresIn: '15m' }, // Access token expiration time
    }),
    JwtModule.register({
      secret: process.env.JWT_REFRESH_SECRET, // Secret for refresh token
      signOptions: { expiresIn: '7d' }, // Refresh token expiration time
    }),
  ],
  
  providers: [AuthService, UserService,
    ClubService,
    AgenceService,
    AubergeService],
  controllers: [AuthController]
})
export class AuthModule {}
