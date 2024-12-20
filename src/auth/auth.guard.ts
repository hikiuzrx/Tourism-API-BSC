import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRequest } from '../types';
import { Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const response = context.switchToHttp().getResponse<Response>();

    const accessToken = this.extractTokenFromHeader(request);
    const refreshToken = request.cookies?.refreshToken;

    // Step 1: Verify Access Token
    if (accessToken) {
      try {
        const accessPayload = this.jwtService.verify(accessToken, {
          secret: process.env.JWT_ACCESS_SECRET,
        });
        request.user = accessPayload; // Add payload to req.user
        request.accessToken = accessToken; // Add access token to req
        return true;
      } catch (error) {
        if (error.name !== 'TokenExpiredError') {
          throw new UnauthorizedException('Invalid access token');
        }
      }
    }

    // Step 2: Verify Refresh Token if Access Token is Expired
    if (refreshToken) {
      try {
        const refreshPayload = this.jwtService.verify(refreshToken, {
          secret: process.env.JWT_REFRESH_SECRET,
        });

        // Generate a new access token
        const newAccessToken = this.jwtService.sign(
          { ...refreshPayload },
          { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' }
        );

        // Generate a new refresh token
        const newRefreshToken = this.jwtService.sign(
          { ...refreshPayload },
          { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' }
        );

        // Clear the previous refresh token
        response.clearCookie('refreshToken');

        // Set the new refresh token in the HTTP-only cookie
        response.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });

        // Attach new tokens
        request.user = refreshPayload; // Add payload to req.user
        request.accessToken = newAccessToken; // Add new access token to req

        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }
    }

    throw new UnauthorizedException('Unauthorized access');
  }

  private extractTokenFromHeader(request: AuthRequest): string | undefined {
    const authorization = request.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return undefined;
    }
    return authorization.split(' ')[1];
  }
}
