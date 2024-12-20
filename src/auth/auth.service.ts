import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AgenceService } from 'src/agence/agence.service';
import { AubergeService } from 'src/auberge/auberge.service';
import { ClubService } from 'src/club/club.service';
import { UserService } from 'src/user/user.service';
import { User, Agence, Auberge, Club } from '@prisma/client';

type UserPayload = {
  id: number;
  role: 'user';
};

type ClubPayload = {
  id: number;
  role: 'club';
};

type AubergePayload = {
  id: number;
  role: 'auberge';
};

type AgencePayload = {
  id: number;
  role: 'agence';
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly clubService: ClubService,
    private readonly agenceService: AgenceService,
    private readonly aubergeService: AubergeService,
  ) {}

  // Placeholder for user registration logic
  async userRegistration() {
    
    throw new Error('userRegistration not implemented');
  }

  /**
   * Generate Access and Refresh Tokens
   */
  async generateTokens<T extends { id: number; role: string }>(user: T) {
    let payload: UserPayload | ClubPayload | AgencePayload | AubergePayload;

    // Build payload based on user role
    switch (user.role) {
      case 'user':
        payload = { id: user.id, role: 'user' };
        break;
      case 'club':
        payload = { id: user.id, role: 'club' };
        break;
      case 'auberge':
        payload = { id: user.id, role: 'auberge' };
        break;
      case 'agence':
        payload = { id: user.id, role: 'agence' };
        break;
      default:
        throw new Error(`Invalid user role: ${user.role}`);
    }

    // Generate Access Token
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m', // Short expiry for access token
    });

    // Generate Refresh Token
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // Longer expiry for refresh token
    });

    return { accessToken, refreshToken };
  }

  /**
   * Validate Access Token
   */
  async validateAccessToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: process.env.JWT_ACCESS_SECRET });
    } catch (err) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  /**
   * Validate Refresh Token
   */
  async validateRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: process.env.JWT_REFRESH_SECRET });
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
