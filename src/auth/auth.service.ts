import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async generateTokens(userId: string, email: string) {
    const payload = { sub: userId };

    // Access token with a specific secret
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m', // Short expiry for access token
    });

    // Refresh token with a different secret
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // Longer expiry for refresh token
    });

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_ACCESS_SECRET, // Verify with access secret
    });
  }

  async verifyRefreshToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_REFRESH_SECRET, // Verify with refresh secret
    });
  }
}
